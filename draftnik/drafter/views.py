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
    DraftCloneSerializer,
    DraftCreateSerializer,
    DraftDetailResponseSerializer,
    DraftResponseSerializer,
    DraftSerializer,
    DraftUpdateSerializer,
    DraftUrlSerializer,
)


class DraftView(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    def get_serializer_class(self):
        serializers = {
            "create": DraftCreateSerializer,
            "update": DraftUpdateSerializer,
            "static": DraftResponseSerializer,
            "url": DraftUrlSerializer,
            "clone": DraftCloneSerializer,
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

    @action(detail=False, methods=["post"])
    def clone(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=self.request.user)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class DraftDetailView(View):
    def get(self, request, shared_url):
        try:
            payload = decode_payload(shared_url)
            draft = Draft.objects.get(id=payload.get("id"))
        except (jwt.InvalidSignatureError, ObjectDoesNotExist):
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)

        serializer = DraftDetailResponseSerializer({"static": True, "draft": draft})

        return JsonResponse(serializer.data)
