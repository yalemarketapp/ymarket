import os
from django.db import models
from django.conf import settings

AUTH_USER_MODEL = getattr(settings, 'AUTH_USER_MODEL', 'auth.User')

def get_image_path(instance, filename):
    return os.path.join('data', 'posts', str(instance.id), filename)

class Post(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=64, blank=False)
    content = models.TextField(blank=True)
    date_posted = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(AUTH_USER_MODEL, related_name="posts", on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=9, decimal_places=2, blank=True, null=True)
    category = models.CharField(max_length=32, default='general')
    is_buy = models.BooleanField(null=False, blank=True) # True for buy, False for sell

    # isSold = models.BooleanField(default=False)
    # isAnonymous = models.BooleanField(default=False)
    # isDraft = models.BooleanField(default=False)
    
    def __str__(self):
        return str(self.author) + ": " + self.title

    @property 
    def owner(self): 
        return self.author

class PostImage(models.Model):
    id = models.AutoField(primary_key=True)
    post = models.ForeignKey(Post, related_name='postimages', on_delete=models.CASCADE)
    image_url = models.URLField(blank=True, null=True)
