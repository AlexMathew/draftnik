import json

from draftnik.keys import TEAM_DATA_KEY
from helpers.instances import redis


def get_team_data():
    return json.loads(redis.get(TEAM_DATA_KEY))
