import json
from collections import defaultdict
from operator import itemgetter

import requests

from draftnik.keys import PLAYER_DATA_KEY, PLAYER_ID_KEY, TEAM_DATA_KEY
from helpers.instances import redis


def store_players(r):
    FIELDS = [
        "id",
        "code",
        "first_name",
        "second_name",
        "web_name",
        "team",
        "team_code",
        "photo",
    ]
    field_getter = itemgetter(*FIELDS)

    player_data = {}
    players = iter(r.json()["elements"])
    for player in players:
        data = {key: value for key, value in zip(FIELDS, field_getter(player))}
        player_data[data.get("id")] = data

        redis.set(
            PLAYER_ID_KEY(data.get("web_name"), data.get("team_code")), data.get("id")
        )

    redis.set(PLAYER_DATA_KEY, json.dumps(player_data))


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
