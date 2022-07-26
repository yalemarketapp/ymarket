from django.contrib.auth import get_user_model
from rest_framework import serializers
from messages.models import MessageThread, Message
from posts.serializers import AuthorSerializer

UserModel = get_user_model()

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['body', 'sender', 'receiver', 'sent_at']

class MessageThreadSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)
    title = serializers.CharField(required=False)

    class Meta:
        model = MessageThread
        fields = ['id', 'title', 'sender', 'receiver', 'messages']

class ProfileMessageThreadSerializer(serializers.ModelSerializer):
    sender = AuthorSerializer(read_only=True)
    receiver = AuthorSerializer(read_only=True)

    class Meta:
        model = MessageThread
        fields = ['id', 'title', 'sender', 'receiver']
