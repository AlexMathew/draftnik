import json
from collections import defaultdict
from operator import itemgetter

import requests

from draftnik.keys import PLAYER_ID_KEY, TEAM_DATA_KEY
from helpers.instances import redis


def store_players(r):
    players = iter(r.json()["elements"])
    for player in players:
        player_id = player.get("id")
        web_name = player.get("web_name")
        team_code = player.get("team_code")

        redis.set(PLAYER_ID_KEY(web_name, team_code), player_id)


def store_teams(r):
    FIELDS = ["id", "code", "name", "short_name"]
    field_getter = itemgetter(*FIELDS)

    team_data = {}
    teams = iter(r.json()["teams"])
    for team in teams:
        data = {key: value for key, value in zip(FIELDS, field_getter(team))}
        team_data[data.get("id")] = data

    redis.set(TEAM_DATA_KEY, json.dumps(team_data))


def fetch_static_data(players=True, teams=False):
    URL = "https://fantasy.premierleague.com/api/bootstrap-static/"
    r = requests.get(URL)

    if players:
        store_players(r)

    if teams:
        store_teams(r)
