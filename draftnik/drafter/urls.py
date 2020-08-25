from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import DraftView

urlpatterns = [
    path("auth/", include("djoser.urls")),
    path("auth/", include("djoser.urls.authtoken")),
    # path("social_auth/", include("rest_framework_social_oauth2.urls")),
]

router = DefaultRouter()
router.register(r"draft", DraftView, basename="draft")

urlpatterns += [
    path("", include(router.urls)),
]
