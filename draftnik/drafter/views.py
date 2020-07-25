from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Draft
from .serializers import DraftCreateSerializer, DraftSerializer


class DraftView(
    mixins.ListModelMixin, mixins.CreateModelMixin, viewsets.GenericViewSet,
):
    def get_serializer_class(self):
        if self.action in ["create"]:
            return DraftCreateSerializer

        return DraftSerializer

    def get_queryset(self):
        return Draft.objects.filter(user=self.request.user)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
