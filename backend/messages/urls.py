from django.urls import path
from messages import views
from rest_framework.urlpatterns import format_suffix_patterns

from messages.views import *

urlpatterns = [
    path('thread/', views.MessageThreadList.as_view()),
    path('thread/<int:pk>/', views.MessageThreadDetail.as_view()),
    path('thread/sent/<uuid:pk>/', views.UserSentMessageThreads.as_view()),
    path('thread/received/<uuid:pk>/',
         views.UserReceivedMessageThreads.as_view()),
]
