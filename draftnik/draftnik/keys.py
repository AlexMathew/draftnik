from django.utils.text import slugify

PLAYER_ID_PREFIX = "PLAYER_ID_"
PLAYER_ID_KEY = lambda name, team_code: f"{PLAYER_ID_PREFIX}{team_code}_{slugify(name)}"

TEAM_ID_PREFIX = "TEAM_ID_"
TEAM_ID_KEY = lambda team_id: f"{TEAM_ID_PREFIX}{team_id}"
