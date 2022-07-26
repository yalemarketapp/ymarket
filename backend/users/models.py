import uuid 
from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import YmarketUserManager

# Create your models here.
class YmarketUser(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = None
    first_name = models.CharField(max_length=150, blank=False)
    last_name = models.CharField(max_length=150, blank=False)
    email = models.EmailField(unique=True, blank=False)
    biography = models.TextField(blank=True)
    avatar_url = models.CharField(max_length=250, blank=True)
    
    objects = YmarketUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'password']
