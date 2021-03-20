import uuid

from django.conf import settings
from django.db import models
from django.utils.functional import cached_property

# from jobs.preview import take_screenshot
from utils.jwt import encode_payload


def get_random_draft_name():
    return f"Draft {uuid.uuid4().hex[:9].upper()}"


class Draft(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="drafts", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=256, default=get_random_draft_name)
    gameweek = models.IntegerField(blank=False, null=False)
    cloned = models.BooleanField(default=False)
    entries = models.JSONField(default=list)
    unavailable = models.JSONField(default=None, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=["user"], name="user_index"),
        ]
        ordering = ["-created_at"]

    def __str__(self):
        return f"#{self.gameweek}- {self.name} ({self.user})"

    # def save(self, *args, **kwargs):
    #     is_new = self._state.adding
    #     super().save(*args, **kwargs)
    #     if is_new:
    #         take_screenshot.delay(
    #             shareable_url=self.shareable_url,
    #             preview_filename=self.preview_filename,
    #         )

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


class Gameweek(models.Model):
    gw_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=16, blank=True, null=True)
    deadline = models.DateTimeField(help_text="UTC", null=True)
    active = models.BooleanField(default=False)

    class Meta:
        ordering = ["gw_id"]

    def __str__(self):
        return f"{self.gw_id}: {self.name} ({self.active})"


class Collection(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="collections", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=256)
    drafts = models.ManyToManyField(Draft, related_name="collections")
    created_at = models.DateTimeField(auto_now_add=True)
