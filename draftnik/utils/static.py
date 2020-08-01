import json

from draftnik.keys import (
    GAMEWEEK_DATA_KEY,
    PLAYER_DATA_KEY,
    TEAM_DATA_KEY,
    TEAM_FIXTURES_DATA_KEY,
)
from helpers.instances import redis


def get_team_data():
    return json.loads(redis.get(TEAM_DATA_KEY) or "{}")


def get_player_data():
    return json.loads(redis.get(PLAYER_DATA_KEY) or "{}")


def get_gameweek_data():
    return json.loads(redis.get(GAMEWEEK_DATA_KEY) or "{}")


def get_team_fixtures_data():
    return json.loads(redis.get(TEAM_FIXTURES_DATA_KEY) or "{}")
