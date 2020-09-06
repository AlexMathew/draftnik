import uuid

from django.conf import settings
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.functional import cached_property

from jobs.preview import take_screenshot
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
    def encoded(self):
        payload = {"id": self.id}
        return encode_payload(payload).decode("utf-8")

    @cached_property
    def shareable_url(self):
        return f"/draft/{self.encoded}"

    @cached_property
    def preview_filename(self):
        return self.encoded.replace(".", "_")


@receiver(post_save, sender=Draft)
def save_draft_preview(sender, instance=None, created=False, **kwargs):
    if created:
        take_screenshot.delay(
            shareable_url=instance.shareable_url,
            preview_filename=instance.preview_filename,
        )
