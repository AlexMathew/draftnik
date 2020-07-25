import uuid

from django.conf import settings
from django.contrib.postgres.fields import JSONField
from django.db import models


def get_random_draft_name():
    return f"Draft {uuid.uuid4().hex[:9].upper()}"


class Draft(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="drafts", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=100, default=get_random_draft_name)
    gameweek = models.IntegerField(blank=False, null=False)
    entries = JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"#{self.gameweek}- {self.name} ({self.user})"
