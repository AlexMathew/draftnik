import logging

from drafter.models import Draft
from draftnik.celery import app
from draftnik.keys import PLAYER_ID_KEY
from helpers.instances import redis

logger = logging.getLogger(__name__)


@app.task(name="draftnik.refetch_unavailable_players")
def refetch_unavailable_players():
    for draft in Draft.objects.filter(unavailable__isnull=False):
        logger.info(f"Fetching unavailable players from {draft}")
        new_entries = draft.entries
        original_entries_count = len(draft.entries)
        new_unavailable = []

        for player in draft.unavailable:
            player_id = redis.get(PLAYER_ID_KEY(player.get("name"), player.get("team")))
            if player_id:
                new_entries.append(player_id.decode("utf-8"))
            else:
                new_unavailable.append(player)

        if len(new_entries) == original_entries_count:
            logger.info("No new player IDs found")
        else:
            draft.entries = new_entries
            draft.unavailable = new_unavailable or None
            draft.save(update_fields=["entries", "unavailable"])
