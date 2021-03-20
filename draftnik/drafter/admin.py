from django.contrib import admin

from .models import Draft, Gameweek, Collection


@admin.register(Draft)
class DraftAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "gameweek", "name", "cloned", "created_at")


@admin.register(Gameweek)
class GameweekAdmin(admin.ModelAdmin):
    list_display = ("gw_id", "name", "deadline", "active")
    readonly_fields = ("gw_id", "name", "deadline")


@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "name", "created_at")
    filter_horizontal = ("drafts",)
