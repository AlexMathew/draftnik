from rest_framework import serializers

from draftnik.keys import PLAYER_ID_KEY
from helpers.instances import redis
from utils.static import get_player_data, get_team_data

from .models import Draft


class DraftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Draft
        fields = "__all__"


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

        fields = {"user": user, "entries": entries, "gameweek": 1}
        if name:
            fields.update({"name": name})

        instance = Draft.objects.create(**fields)

        return instance


class DraftStaticDataSerializer(serializers.Serializer):
    players = serializers.ReadOnlyField(default=get_player_data)
    teams = serializers.ReadOnlyField(default=get_team_data)


class DraftResponseSerializer(serializers.Serializer):
    static = DraftStaticDataSerializer(read_only=True)
    drafts = DraftSerializer(many=True, read_only=True)
