from django.urls import include, path

from .views import SaveDraftView

urlpatterns = [
    path("auth/", include("djoser.urls")),
    path("auth/", include("djoser.urls.authtoken")),
]

urlpatterns += [path("save/", SaveDraftView.as_view(), name="save_draft")]
