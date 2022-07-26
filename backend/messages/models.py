from django.db import models
from django.conf import settings

AUTH_USER_MODEL = getattr(settings, 'AUTH_USER_MODEL', 'auth.User')

class MessageThread(models.Model):
    """
    A message thread between two users. 
    """
    title = models.TextField()
    sender = models.ForeignKey(AUTH_USER_MODEL, related_name='sent_convos', on_delete=models.CASCADE)
    receiver = models.ForeignKey(AUTH_USER_MODEL, related_name='received_convos', on_delete=models.CASCADE)

class Message(models.Model):
    """
    A private message from user to user
    """
    body = models.TextField()
    thread = models.ForeignKey(MessageThread, related_name='messages', on_delete=models.CASCADE, blank=True)
    sender = models.ForeignKey(AUTH_USER_MODEL, related_name='sent_messages', on_delete=models.CASCADE)
    receiver = models.ForeignKey(AUTH_USER_MODEL, related_name='received_messages', on_delete=models.CASCADE)
    sent_at = models.DateTimeField(null=True, blank=True, auto_now_add=True)

    class Meta:
        ordering = ['sent_at']

    def __str__(self):
        return self.body
