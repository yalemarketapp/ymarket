from django.urls import path
from posts import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('post/', views.PostList.as_view()),
    path('post/<uuid:pk>/', views.UserPostList.as_view()),
    path('post/<int:pk>', views.PostDetail.as_view()),
    path('post-images/', views.PostImageList.as_view()),
    path('post-images/<int:pk>', views.PostImageDetail.as_view()) 
]

urlpatterns = format_suffix_patterns(urlpatterns)
