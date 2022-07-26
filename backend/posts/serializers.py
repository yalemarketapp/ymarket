from django.contrib.auth import get_user_model
from rest_framework import serializers
from posts.models import Post, PostImage
from drf_queryfields import QueryFieldsMixin

UserModel = get_user_model()

# author serializer for posts
class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'first_name', 'last_name', 'email']

# image url serializer for posts
class ImageURLSerializer(serializers.ModelSerializer):
     class Meta:
        model = PostImage
        fields = ['id', 'image_url']

class PostSerializer(QueryFieldsMixin, serializers.ModelSerializer):
    postimages = ImageURLSerializer(many=True, read_only=True)
    author = AuthorSerializer(read_only=True)
    
    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'date_posted', 'author', 'price', 'category', 'is_buy', 'postimages']

# serializer for PUT operations only (no fields should be required)
class PostUpdateSerializer(PostSerializer):
    title = serializers.CharField(max_length=64, required=False)

class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = '__all__'
        read_only_fields = ['post']
