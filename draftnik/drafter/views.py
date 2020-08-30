from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Draft
from .serializers import (
    DraftCreateSerializer,
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
