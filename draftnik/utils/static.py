import json

from draftnik.keys import TEAM_ID_PREFIX
from helpers.instances import redis


def get_all_teams():
    team_id = lambda key: int(key.decode("utf-8").split(TEAM_ID_PREFIX)[-1])

    return {
        team_id(key): json.loads(redis.get(key))
        for key in redis.r.scan_iter(match=f"{TEAM_ID_PREFIX}*")
    }
