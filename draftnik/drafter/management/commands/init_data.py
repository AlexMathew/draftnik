import logging

from django.core.management.base import BaseCommand

from jobs.fpl_static import fetch_fixtures, fetch_static_data

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = "Init static data for Draftnik"

    def handle(self, *args, **options):
        logger.debug("Fetch static data")
        fetch_static_data(players=True, teams=True, gameweeks=True)
        logger.debug("Fetch fixtures")
        fetch_fixtures(1, 47)
