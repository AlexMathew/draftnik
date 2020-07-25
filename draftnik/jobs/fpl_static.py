import json
from collections import defaultdict

import requests

from draftnik.keys import PLAYER_ID_KEY
from helpers.instances import redis


def store_players(r):
    players_by_team_and_name = defaultdict(dict)

    players = iter(r.json()["elements"])
    for player in players:
        player_id = player.get("id")
        web_name = player.get("web_name")
        team_code = player.get("team_code")

        redis.set(PLAYER_ID_KEY(web_name, team_code), player_id)


def fetch_static_data():
    URL = "https://fantasy.premierleague.com/api/bootstrap-static/"
    r = requests.get(URL)

    store_players(r)
