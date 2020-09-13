from urllib.parse import urljoin

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
    get_player_data,
    get_team_data,
    get_team_fixtures_data,
)

from .models import Draft


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


class DraftElementSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=50, required=True)
    team = serializers.CharField(max_length=2, required=True)


class DraftCreateSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")
    squad = DraftElementSerializer(many=True, write_only=True)
    name = serializers.CharField(max_length=100, required=False)

    class Meta:
        model = Draft
        fields = ["user", "squad", "name", "gameweek"]
        read_only_fields = ["gameweek"]

    def _get_player_id(self, player):
        return redis.get(PLAYER_ID_KEY(player.get("name"), player.get("team"))).decode(
            "utf-8"
        )

    def create(self, validated_data):
        user = validated_data.get("user")
        squad = validated_data.get("squad")
        name = validated_data.get("name")

        entries = [self._get_player_id(player) for player in squad]

        fields = {"user": user, "entries": entries, "gameweek": 2}
        if name:
            fields.update({"name": name})

        instance = Draft.objects.create(**fields)

        return instance


class DraftCloneSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")
    draft_code = serializers.CharField(write_only=True)

    class Meta:
        model = Draft
        fields = ["user", "draft_code", "name", "gameweek"]
        read_only_fields = ["name", "gameweek"]

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
            "gameweek": 1,
            "name": f"{draft.name} (cloned from {draft.user.username})",
        }
        new_draft = Draft.objects.create(**fields)

        return new_draft


class DraftStaticDataSerializer(serializers.Serializer):
    players = serializers.ReadOnlyField(default=get_player_data)
    teams = serializers.ReadOnlyField(default=get_team_data)
    gameweeks = serializers.ReadOnlyField(default=get_gameweek_data)
    team_fixtures = serializers.ReadOnlyField(default=get_team_fixtures_data)
    current_gameweek = serializers.ReadOnlyField(default=get_current_gameweek)


class DraftResponseSerializer(serializers.Serializer):
    static = DraftStaticDataSerializer(read_only=True)
    drafts = DraftSerializer(many=True, read_only=True)


class DraftUrlSerializer(serializers.Serializer):
    url = serializers.SerializerMethodField()

    def get_url(self, obj):
        return urljoin(settings.DASHBOARD_URL, obj.shareable_url)


class DraftDetailResponseSerializer(serializers.Serializer):
    static = DraftStaticDataSerializer(read_only=True)
    draft = DraftSerializer(read_only=True)
