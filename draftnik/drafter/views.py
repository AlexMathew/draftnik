from drafter.taxonomies import CollectionAssignmentOperations
import jwt
from django.core.exceptions import ObjectDoesNotExist
from django.http.response import HttpResponse, JsonResponse
from django.views import View
from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from utils.jwt import decode_payload

from .exceptions import DifferentUserDraftInCollectionError, EditClonedDraftError
from .models import Collection, Draft
from .serializers import (
    CollectionAssignSerializer,
    CollectionSerializer,
    DraftCloneSerializer,
    DraftCreateSerializer,
    DraftDetailResponseSerializer,
    DraftSerializer,
    DraftUpdateSerializer,
    DraftUrlSerializer,
    StaticResponseSerializer,
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
            "static": StaticResponseSerializer,
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

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        try:
            self.perform_update(serializer)
        except EditClonedDraftError:
            return Response(
                data={"error": {"name": "Cannot rename cloned draft."}},
                status=status.HTTP_405_METHOD_NOT_ALLOWED,
            )

        if getattr(instance, "_prefetched_objects_cache", None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    @action(detail=False)
    def static(self, request):
        drafts = self.get_queryset()
        collections = self.request.user.collections

        serializer = self.get_serializer(
            {"static": True, "drafts": drafts, "collections": collections}
        )
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


class CollectionView(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    def get_serializer_class(self):
        serializers = {
            "add": CollectionAssignSerializer,
            "remove": CollectionAssignSerializer,
        }

        return serializers.get(self.action) or CollectionSerializer

    def get_queryset(self):
        return Collection.objects.filter(user=self.request.user)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def draft_assignment(self, request, collection, operation):
        try:
            serializer = self.get_serializer(collection, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(user=self.request.user, operation=operation)
        except DifferentUserDraftInCollectionError:
            return Response(
                data={
                    "error": {
                        "name": "Cannot operate on draft of a different user in a collection."
                    }
                },
                status=status.HTTP_405_METHOD_NOT_ALLOWED,
            )

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=["post"])
    def add(self, request, pk=None):
        collection = self.get_object()
        return self.draft_assignment(
            request, collection, operation=CollectionAssignmentOperations.ADD
        )

    @action(detail=True, methods=["post"])
    def remove(self, request, pk=None):
        collection = self.get_object()
        return self.draft_assignment(
            request, collection, operation=CollectionAssignmentOperations.REMOVE
        )
