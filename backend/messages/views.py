from messages.models import MessageThread, Message
from django.contrib.auth import get_user_model

from messages.serializers import MessageSerializer, MessageThreadSerializer, ProfileMessageThreadSerializer
from rest_framework import mixins
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from messages.permissions import IsInThread

User = get_user_model()

class MessageThreadList(mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  generics.GenericAPIView):
    serializer_class = MessageThreadSerializer
    permission_classes = [IsAuthenticated]
    queryset = MessageThread.objects.all() 

    def perform_create(self, serializer):
        data = self.request.data
        receiver = User.objects.get(id=data['receiver'])
        return serializer.save(sender=self.request.user)

    # Users should not be able to access all threads
    # def get(self, request, *args, **kwargs):
    #     return self.list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        data = self.request.data
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)          
        thread = self.perform_create(serializer)

        # when Thread is initialized, we should save the first Message
        receiver = User.objects.get(id=data['receiver'])
        Message(thread=thread, body=data['body'], sender=self.request.user, 
            receiver=receiver).save()
     
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class MessageThreadDetail(mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    generics.GenericAPIView):
    
    queryset = MessageThread.objects.all()
    serializer_class = MessageThreadSerializer
    permission_classes = [IsAuthenticated, IsInThread]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = MessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(thread=instance)

        return Response(serializer.data)

    def perform_update(self, serializer):
        return serializer.save()

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

class UserSentMessageThreads(mixins.ListModelMixin, generics.GenericAPIView):
    serializer_class = ProfileMessageThreadSerializer

    def get_queryset(self):
        id = self.kwargs['pk']
        return MessageThread.objects.filter(sender=id)
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

class UserReceivedMessageThreads(mixins.ListModelMixin, generics.GenericAPIView):
    serializer_class = ProfileMessageThreadSerializer
    
    def get_queryset(self):
        id = self.kwargs['pk']
        print(id)
        return MessageThread.objects.filter(receiver=id)
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)