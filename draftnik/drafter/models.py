import uuid

from django.conf import settings
from django.db import models
from django.utils.functional import cached_property

from utils.jwt import encode_payload


def get_random_draft_name():
    return f"Draft {uuid.uuid4().hex[:9].upper()}"


class Draft(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="drafts", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=256, default=get_random_draft_name)
    gameweek = models.IntegerField(blank=False, null=False)
    entries = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=["user"], name="user_index"),
        ]
        ordering = ["-created_at"]

    def __str__(self):
        return f"#{self.gameweek}- {self.name} ({self.user})"

    @cached_property
    def shareable_url(self):
        payload = {"id": self.id}
        return f"/draft/{encode_payload(payload).decode('utf-8')}"
