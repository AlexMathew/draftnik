from django.utils.text import slugify

PLAYER_ID_KEY = lambda name, team_code: f"{team_code}_{slugify(name)}"
