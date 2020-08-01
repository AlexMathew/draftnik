import json
from collections import defaultdict
from operator import itemgetter

import requests

from draftnik.keys import (
    GAMEWEEK_DATA_KEY,
    PLAYER_DATA_KEY,
    PLAYER_ID_KEY,
    TEAM_DATA_KEY,
    TEAM_FIXTURES_DATA_KEY,
)
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
        "element_type",
        "now_cost",
        "status",
        "news",
        "news_added",
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


def store_gameweeks(r):
    FIELDS = ["id", "name", "deadline_time", "finished"]
    field_getter = itemgetter(*FIELDS)

    gameweek_data = {}
    gameweeks = iter(r.json()["events"])
    for gameweek in gameweeks:
        data = {key: value for key, value in zip(FIELDS, field_getter(gameweek))}
        gameweek_data[data.get("id")] = data

    redis.set(GAMEWEEK_DATA_KEY, json.dumps(gameweek_data))


def fetch_static_data(players=True, teams=False, gameweeks=False):
    URL = "https://fantasy.premierleague.com/api/bootstrap-static/"
    r = requests.get(URL)

    if players:
        store_players(r)

    if teams:
        store_teams(r)

    if gameweeks:
        store_gameweeks(r)


def fetch_fixtures(start, end):
    URL = "https://fantasy.premierleague.com/api/fixtures/"

    fixtures = defaultdict(lambda: defaultdict(list))
    for gw in range(start, end + 1):
        print(gw)
        r = requests.get(URL, params={"event": gw})
        data = r.json()
        for match in data:
            event, team_a, team_h = (
                match.get("event"),
                match.get("team_a"),
                match.get("team_h"),
            )
            fixtures[team_h][event].append(
                {"opponent": team_a, "location": "H", "gw": event}
            )
            fixtures[team_a][event].append(
                {"opponent": team_h, "location": "A", "gw": event}
            )

    redis.set(TEAM_FIXTURES_DATA_KEY, json.dumps(fixtures))
