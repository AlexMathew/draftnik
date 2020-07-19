from django.urls import include, path

from .views import SaveDraftView

urlpatterns = [path("save/", SaveDraftView.as_view(), name="save_draft")]
