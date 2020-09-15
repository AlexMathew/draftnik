import json

from draftnik.keys import (
    CURRENT_GAMEWEEK_KEY,
    GAMEWEEK_DATA_KEY,
    GAMEWEEK_FIXTURES_DATA_KEY,
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


def get_gameweek_fixtures_data():
    return json.loads(redis.get(GAMEWEEK_FIXTURES_DATA_KEY) or "{}")


def get_current_gameweek():
    return (redis.get(CURRENT_GAMEWEEK_KEY) or b"1").decode("utf-8")
