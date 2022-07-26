from allauth.account.views import ConfirmEmailView, get_adapter
from django.contrib import messages
from django.contrib.auth import get_user_model
from django.http import Http404

from rest_framework import mixins
from rest_framework import generics
from rest_framework import status, views
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from users.serializers import UserProfileSerializer
from users.permissions import IsUserOrReadOnly

from posts.imgur_helpers import upload_image_imgur

UserModel = get_user_model()

class UserProfileView(mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    generics.GenericAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated, IsUserOrReadOnly]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        # upload and save url for image avatar for this user profile 
        image_url = None
        file_list = request.FILES.getlist('files')
        if len(file_list) > 0: 
            image_url = upload_image_imgur(file_list[0])
            
        self.perform_update(serializer, image_url)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def perform_update(self, serializer, image_url):
        if image_url is not None: 
            serializer.save(avatar_url=image_url)
        else: 
            serializer.save() 

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

class JsonConfirmEmailView(views.APIView, ConfirmEmailView):
    def get(self, *args, **kwargs):
        try:
            self.object = self.get_object()
            return self.post(*args, **kwargs)
        except Http404:
            self.object = None
            data = {'detail': 'This link is invalid or expired.'}
            return Response(data, status=status.HTTP_400_BAD_REQUEST)

    def post(self, *args, **kwargs):
        self.object = confirmation = self.get_object()
        confirmation.confirm(self.request)

        get_adapter(self.request).add_message(
            self.request,
            messages.SUCCESS,
            "account/messages/email_confirmed.txt",
            {"email": confirmation.email_address.email},
        )

        data = {'detail': 'Email confirmed.'}
        return Response(data, status=status.HTTP_200_OK)
