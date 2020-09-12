from django.contrib import admin

from .models import Draft, Gameweek


@admin.register(Draft)
class DraftAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "gameweek", "name", "created_at")


@admin.register(Gameweek)
class GameweekAdmin(admin.ModelAdmin):
    list_display = ("gw_id", "name", "deadline", "active")
    readonly_fields = ("gw_id", "name", "deadline")
