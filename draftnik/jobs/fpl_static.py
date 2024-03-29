import json
import logging
from collections import defaultdict
from datetime import datetime
from operator import itemgetter

import requests

from drafter.models import Gameweek
from draftnik.celery import app
from draftnik.keys import (
    CURRENT_GAMEWEEK_KEY,
    GAMEWEEK_DATA_KEY,
    GAMEWEEK_FIXTURES_DATA_KEY,
    PLAYER_DATA_KEY,
    PLAYER_ID_KEY,
    TEAM_DATA_KEY,
    TEAM_FIXTURES_DATA_KEY,
)
from helpers.instances import redis
from utils.static import (
    get_current_gameweek,
    get_gameweek_fixtures_data,
    get_team_data,
    get_team_fixtures_data,
)

logger = logging.getLogger(__name__)


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

        logger.info(f'Player - {data.get("web_name")}')
        redis.set(
            PLAYER_ID_KEY(data.get("web_name"), data.get("team_code")), data.get("id")
        )

    redis.set(PLAYER_DATA_KEY, json.dumps(player_data))


def store_teams(r):
    FIELDS = ["id", "code", "name", "short_name", "strength"]
    field_getter = itemgetter(*FIELDS)

    team_data = {}
    teams = iter(r.json()["teams"])
    for team in teams:
        data = {key: value for key, value in zip(FIELDS, field_getter(team))}
        team_data[data.get("id")] = data
        logger.info(f'Team - {data.get("name")}')

    redis.set(TEAM_DATA_KEY, json.dumps(team_data))


def store_gameweeks(r):
    FIELDS = ["id", "name", "deadline_time", "finished"]
    field_getter = itemgetter(*FIELDS)

    gameweek_data = {}
    gameweeks = iter(r.json()["events"])
    for gameweek in gameweeks:
        data = {key: value for key, value in zip(FIELDS, field_getter(gameweek))}
        gameweek_data[data.get("id")] = data
        logger.info(f'Gameweek - {data.get("name")}')

    redis.set(GAMEWEEK_DATA_KEY, json.dumps(gameweek_data))
    configure_gameweek_updates(gameweek_data)


@app.task(name="draftnik.fetch_static_data")
def fetch_static_data(players=True, teams=False, gameweeks=False):
    logger.info("fetch_static_data")
    URL = "https://fantasy.premierleague.com/api/bootstrap-static/"
    r = requests.get(URL)

    if players:
        store_players(r)

    if teams:
        store_teams(r)

    if gameweeks:
        store_gameweeks(r)


@app.task(name="draftnik.fetch_fixtures")
def fetch_fixtures(start=1, end=38):
    logger.info("fetch_fixtures")
    URL = "https://fantasy.premierleague.com/api/fixtures/"

    teams = get_team_data()
    fixtures = get_team_fixtures_data()
    gameweek_fixtures = get_gameweek_fixtures_data()
    for gw in range(start, end + 1):
        gw = str(gw)
        logger.info(f"Fixtures GW#{gw}")

        gameweek_fixtures[gw] = []
        for team in teams.keys():
            fixtures[team][gw] = []

        r = requests.get(URL, params={"event": gw})
        data = r.json()
        for match in data:
            event, team_a, team_h, kickoff_time = (
                match.get("event"),
                match.get("team_a"),
                match.get("team_h"),
                match.get("kickoff_time"),
            )
            fixtures[str(team_h)][str(event)].append(
                {"opponent": team_a, "location": "H", "gw": event}
            )
            fixtures[str(team_a)][str(event)].append(
                {"opponent": team_h, "location": "A", "gw": event}
            )
            gameweek_fixtures[str(event)].append(
                {"home": team_h, "away": team_a, "kickoff_time": kickoff_time}
            )

    redis.set(TEAM_FIXTURES_DATA_KEY, json.dumps(fixtures))
    redis.set(GAMEWEEK_FIXTURES_DATA_KEY, json.dumps(gameweek_fixtures))


@app.task(name="draftnik.fetch_next_fixtures")
def fetch_next_fixtures(count=0):
    current_gameweek = int(get_current_gameweek())
    fetch_fixtures(current_gameweek, current_gameweek + count - 1)


@app.task(name="draftnik.update_gameweek")
def update_gameweek(gameweek):
    Gameweek.objects.all().update(active=False)
    selected_gameweek = Gameweek.objects.filter(gw_id=gameweek)
    if selected_gameweek:
        selected_gameweek.update(active=True)
        redis.set(CURRENT_GAMEWEEK_KEY, gameweek)


def configure_gameweek_updates(gameweek_data):
    for gameweek in gameweek_data.values():
        gw_obj = Gameweek.objects.filter(gw_id=gameweek.get("id", 0))
        if not gw_obj:
            Gameweek.objects.create(
                gw_id=gameweek.get("id", 0),
                name=gameweek.get("name", ""),
                deadline=gameweek.get("deadline_time", None),
            )
            update_gameweek.apply_async(
                (gameweek.get("id", 0) + 1,),
                eta=datetime.strptime(
                    gameweek.get("deadline_time"), "%Y-%m-%dT%H:%M:%S%z"
                ),
            )
