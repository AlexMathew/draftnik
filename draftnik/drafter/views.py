import jwt
from django.core.exceptions import ObjectDoesNotExist
from django.http.response import HttpResponse, JsonResponse
from django.views import View
from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from utils.jwt import decode_payload

from .models import Draft
from .serializers import (
    DraftCreateSerializer,
    DraftDetailResponseSerializer,
    DraftResponseSerializer,
    DraftSerializer,
    DraftUrlSerializer,
)


class DraftView(
    mixins.ListModelMixin, mixins.CreateModelMixin, viewsets.GenericViewSet,
):
    def get_serializer_class(self):
        serializers = {
            "create": DraftCreateSerializer,
            "static": DraftResponseSerializer,
            "url": DraftUrlSerializer,
        }

        return serializers.get(self.action) or DraftSerializer

    def get_queryset(self):
        return Draft.objects.filter(user=self.request.user)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False)
    def static(self, request):
        drafts = self.get_queryset()

        serializer = self.get_serializer({"static": True, "drafts": drafts})
        return Response(serializer.data)

    @action(detail=True, methods=["get"])
    def url(self, request, pk=None):
        draft = self.get_object()

        serializer = self.get_serializer(draft)
        return Response(serializer.data)


class DraftDetailView(View):
    def get(self, request, shared_url):
        try:
            payload = decode_payload(shared_url)
            draft = Draft.objects.get(id=payload.get("id"))
        except (jwt.InvalidSignatureError, ObjectDoesNotExist):
            return HttpResponse(status=404)

        serializer = DraftDetailResponseSerializer({"static": True, "draft": draft})

        return JsonResponse(serializer.data)
