from datetime import datetime
import json
import logging
import os

from django.conf import settings
from django.core.serializers.json import DjangoJSONEncoder
from django.utils.text import slugify

from drafter.models import Draft, Gameweek
from drafter.serializers import DraftSerializer
from helpers.instances import s3

logger = logging.getLogger(__name__)


def archive(last_draft_id=0):
    drafts = Draft.objects.filter(id__lte=last_draft_id)
    total_drafts = drafts.count()
    logger.info(f"Archiving {total_drafts} drafts.")
    drafts_data = []
    for i, draft in enumerate(drafts):
        logger.info(f"Archiving draft {i+1}/{total_drafts} - {draft}")
        serialized_draft = DraftSerializer(draft).data
        drafts_data.append(serialized_draft)

    gameweeks = Gameweek.objects.all()
    total_gameweeks = gameweeks.count()
    logger.info(f"Archiving {total_gameweeks} gameweeks.")
    gameweeks_data = []
    for i, gameweek in enumerate(gameweeks):
        logger.info(f"Archiving gameweek {i+1}/{total_gameweeks} - {gameweek}")
        gameweeks_data.append(
            {
                "gw_id": gameweek.gw_id,
                "name": gameweek.name,
                "deadline": gameweek.deadline,
            }
        )

    if len(drafts_data) == 0:
        return

    data = {"drafts": drafts_data, "gameweeks": gameweeks_data}
    filename = f"drafts-archive-{'DEV' if settings.DEBUG else 'PROD'}-{slugify(datetime.now().isoformat())}"
    file_location = f"/tmp/{filename}.json"
    with open(file_location, "w") as f:
        f.write(json.dumps(data, indent=4, cls=DjangoJSONEncoder))

    s3.upload_file(
        bucket_name=os.getenv("S3_BUCKET_NAME"),
        destination=f"{filename}.json",
        source_file=file_location,
        content_type="text/json",
    )
