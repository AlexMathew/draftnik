import collections
from urllib.parse import urljoin
from drafter.taxonomies import CollectionAssignmentOperations

import jwt
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers

from draftnik.keys import PLAYER_ID_KEY
from helpers.instances import redis
from utils.jwt import decode_payload
from utils.static import (
    get_current_gameweek,
    get_gameweek_data,
    get_gameweek_fixtures_data,
    get_player_data,
    get_team_data,
    get_team_fixtures_data,
)

from .exceptions import DifferentUserDraftInCollectionError, EditClonedDraftError
from .models import Collection, Draft


class DraftSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")
    url = serializers.SerializerMethodField()
    preview_url = serializers.SerializerMethodField()

    class Meta:
        model = Draft
        fields = "__all__"

    def get_url(self, obj):
        return urljoin(settings.DASHBOARD_URL, obj.shareable_url)

    def get_preview_url(self, obj):
        return urljoin(settings.PREVIEW_HOST, f"{obj.preview_filename}.png")


class DraftMinimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Draft
        fields = ["id", "name"]


class DraftElementSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=50, required=True)
    team = serializers.CharField(max_length=2, required=True)


class DraftCreateSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")
    squad = DraftElementSerializer(many=True, write_only=True)
    name = serializers.CharField(max_length=256, required=False)
    gameweek = serializers.IntegerField(required=False, allow_null=True)

    class Meta:
        model = Draft
        fields = ["user", "squad", "name", "gameweek", "cloned"]

    def _get_player_id(self, player):
        return redis.get(PLAYER_ID_KEY(player.get("name"), player.get("team")))

    def _get_squad_entries(self, squad):
        entries, unavailable = [], []
        for player in squad:
            player_id = self._get_player_id(player)
            if player_id:
                entries.append(player_id.decode("utf-8"))
            else:
                unavailable.append(player)

        return {
            "entries": entries,
            "unavailable": unavailable,
        }

    def create(self, validated_data):
        user = validated_data.get("user")
        squad = validated_data.get("squad")
        name = validated_data.get("name")
        gameweek = validated_data.get("gameweek")

        squad_entries = self._get_squad_entries(squad)

        fields = {
            "user": user,
            "entries": squad_entries.get("entries") or [],
            "unavailable": squad_entries.get("unavailable") or None,
            "gameweek": int(gameweek) if gameweek else int(get_current_gameweek()),
        }
        if name:
            fields.update({"name": name})

        instance = Draft.objects.create(**fields)

        return instance


class DraftUpdateSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")
    name = serializers.CharField(max_length=256, required=False)
    gameweek = serializers.IntegerField(required=False, allow_null=True)

    class Meta:
        model = Draft
        fields = ["user", "name", "gameweek"]
        read_only_fields = ["user"]

    def update(self, instance, validated_data):
        name = validated_data.get("name")
        gameweek = validated_data.get("gameweek")

        if name and instance.cloned:
            raise EditClonedDraftError

        instance.name = name or instance.name

        if "gameweek" in validated_data:
            instance.gameweek = gameweek or int(get_current_gameweek())

        instance.save()
        return instance


class DraftCloneSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")
    draft_code = serializers.CharField(write_only=True)

    class Meta:
        model = Draft
        fields = ["user", "draft_code", "name", "gameweek", "cloned"]
        read_only_fields = ["name", "gameweek", "cloned"]

    def create(self, validated_data):
        user = validated_data.get("user")
        draft_code = validated_data.get("draft_code")

        try:
            payload = decode_payload(draft_code)
            draft = Draft.objects.get(id=payload.get("id"))
        except (jwt.InvalidSignatureError, ObjectDoesNotExist):
            raise Exception("Invalid draft code.")

        fields = {
            "user": user,
            "entries": draft.entries,
            "gameweek": int(get_current_gameweek()),
            "name": f"{draft.name} (cloned from {draft.user.username})",
            "cloned": True,
        }
        new_draft = Draft.objects.create(**fields)

        return new_draft


class StaticDataSerializer(serializers.Serializer):
    players = serializers.ReadOnlyField(default=get_player_data)
    teams = serializers.ReadOnlyField(default=get_team_data)
    gameweeks = serializers.ReadOnlyField(default=get_gameweek_data)
    team_fixtures = serializers.ReadOnlyField(default=get_team_fixtures_data)
    gameweek_fixtures = serializers.ReadOnlyField(default=get_gameweek_fixtures_data)
    current_gameweek = serializers.ReadOnlyField(default=get_current_gameweek)


class DraftUrlSerializer(serializers.Serializer):
    url = serializers.SerializerMethodField()

    def get_url(self, obj):
        return urljoin(settings.DASHBOARD_URL, obj.shareable_url)


class DraftDetailResponseSerializer(serializers.Serializer):
    static = StaticDataSerializer(read_only=True)
    draft = DraftSerializer(read_only=True)


class CollectionSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")
    drafts = DraftSerializer(many=True, read_only=True)

    class Meta:
        model = Collection
        fields = "__all__"
        read_only_fields = ["created_at"]

    def create(self, validated_data):
        user = validated_data.get("user")
        name = validated_data.get("name")

        fields = {
            "user": user,
            "name": name,
        }

        instance = Collection.objects.create(**fields)

        return instance


class CollectionMinimalSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")
    drafts = DraftMinimalSerializer(many=True, read_only=True)

    class Meta:
        model = Collection
        fields = ["id", "user", "name", "drafts"]


class CollectionAssignSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")
    draft_id = serializers.CharField(write_only=True)
    drafts = DraftSerializer(many=True, read_only=True)

    class Meta:
        model = Collection
        fields = ["user", "draft_id", "name", "drafts"]
        read_only_fields = ["name"]

    def update(self, obj, validated_data):
        user = validated_data.get("user")
        draft_id = validated_data.get("draft_id")
        operation = validated_data.get("operation")

        try:
            draft = Draft.objects.get(id=draft_id)
            if draft.user != user:
                raise DifferentUserDraftInCollectionError
        except ObjectDoesNotExist:
            raise Exception("Invalid draft id.")

        if operation == CollectionAssignmentOperations.ADD:
            obj.drafts.add(draft)
        elif operation == CollectionAssignmentOperations.REMOVE:
            obj.drafts.remove(draft)

        return obj


class StaticResponseSerializer(serializers.Serializer):
    static = StaticDataSerializer(read_only=True)
    drafts = DraftSerializer(many=True, read_only=True)
    collections = CollectionMinimalSerializer(many=True, read_only=True)
