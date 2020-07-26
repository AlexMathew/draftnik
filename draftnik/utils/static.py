import json

from draftnik.keys import PLAYER_DATA_KEY, TEAM_DATA_KEY
from helpers.instances import redis


def get_team_data():
    return json.loads(redis.get(TEAM_DATA_KEY))


def get_player_data():
    return json.loads(redis.get(PLAYER_DATA_KEY))
