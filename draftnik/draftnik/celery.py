from __future__ import absolute_import

import os

from celery import Celery
from celery.schedules import crontab

from draftnik import settings

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "draftnik.settings")

REDIS_URL = f"redis://{os.getenv('REDIS_HOST')}:{os.getenv('REDIS_PORT')}/0"

app = Celery("draftnik")

app.conf.update(
    BROKER_URL=REDIS_URL,
    CELERY_TASK_RESULT_EXPIRES=3600,
    CELERY_TIMEZONE=settings.TIME_ZONE,
    CELERY_IMPORTS=("jobs.fpl_static", "jobs.squad_entries"),
    CELERYBEAT_SCHEDULE={
        "fetch-static-data": {
            "task": "draftnik.fetch_static_data",
            "schedule": crontab(minute=0, hour="2,14"),
        },
        "fetch-next-fixtures": {
            "task": "draftnik.fetch_next_fixtures",
            "schedule": crontab(minute=0, hour=0, day_of_week="sunday"),
            "kwargs": {"count": 5,},
        },
        "fetch-fixtures": {
            "task": "draftnik.fetch_fixtures",
            "schedule": crontab(minute=0, hour=0, day_of_month="1"),
        },
        "refetch-unavailable-players": {
            "task": "draftnik.refetch_unavailable_players",
            "schedule": crontab(minute=0, hour="*/1"),
        },
    },
)

app.autodiscover_tasks()
