from django.utils.text import slugify

PLAYER_ID_PREFIX = "PLAYER_ID_"
PLAYER_ID_KEY = lambda name, team_code: f"{PLAYER_ID_PREFIX}{team_code}_{slugify(name)}"

PLAYER_DATA_KEY = "PLAYER_DATA"
TEAM_DATA_KEY = "TEAM_DATA"
GAMEWEEK_DATA_KEY = "GAMEWEEK_DATA"
TEAM_FIXTURES_DATA_KEY = "TEAM_FIXTURES_DATA"
