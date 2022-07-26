from django.contrib.auth import get_user_model
from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from posts.models import Post
from posts.serializers import ImageURLSerializer
from drf_queryfields import QueryFieldsMixin
from messages.models import MessageThread
from messages.serializers import ProfileMessageThreadSerializer

UserModel = get_user_model()

# post serializer for the user profile history
class ProfilePostSerializer(serializers.ModelSerializer):
    postimages = ImageURLSerializer(many=True, read_only=True)
    
    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'date_posted','price', 'category', 'is_buy', 'postimages']

class UserProfileSerializer(QueryFieldsMixin, serializers.ModelSerializer):
    # posts = ProfilePostSerializer(many=True, read_only=True)
    # sent_convos = ProfileMessageThreadSerializer(many=True, read_only=True)
    # received_convos = ProfileMessageThreadSerializer(many=True, read_only=True)
    
    # first name and last name are required on login but not for PUT requests
    first_name = serializers.CharField(max_length=150, required=False)
    last_name = serializers.CharField(max_length=150, required=False)

    class Meta:
        model = UserModel
        fields = ['id', 'first_name', 'last_name', 'biography', 'avatar_url', 'email']
        read_only_fields = ['email']

class CustomRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)

    def get_cleaned_data(self):
        return {
            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', ''),
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', '')
        }
