import json
from collections import defaultdict

import requests

from draftnik.keys import PLAYER_ID_KEY, TEAM_ID_KEY
from helpers.instances import redis


def store_players(r):
    players = iter(r.json()["elements"])
    for player in players:
        player_id = player.get("id")
        web_name = player.get("web_name")
        team_code = player.get("team_code")

        redis.set(PLAYER_ID_KEY(web_name, team_code), player_id)


def store_teams(r):
    teams = iter(r.json()["teams"])
    for team in teams:
        team_id = team.get("id")
        team_code = team.get("code")
        name = team.get("name")
        short_name = team.get("short_name")

        data = {
            "id": team_id,
            "code": team_code,
            "name": name,
            "short_name": short_name,
        }

        redis.set(TEAM_ID_KEY(team_id), json.dumps(data))


def fetch_static_data(players=True, teams=False):
    URL = "https://fantasy.premierleague.com/api/bootstrap-static/"
    r = requests.get(URL)

    if players:
        store_players(r)

    if teams:
        store_teams(r)
