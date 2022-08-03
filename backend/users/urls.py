from django.urls import path, re_path
from dj_rest_auth.views import LoginView, LogoutView, PasswordResetView, PasswordResetConfirmView, PasswordChangeView
from dj_rest_auth.registration.views import RegisterView, VerifyEmailView, ResendEmailVerificationView
from users.views import JsonConfirmEmailView, UserProfileView

urlpatterns = [
    path('profile/<uuid:pk>/', UserProfileView.as_view(), name='profile-detail'),
    path('register/', RegisterView.as_view(), name='account_signup'),
    path('login/', LoginView.as_view(), name='account_login'),
    path('logout/', LogoutView.as_view(), name='account_logout'),

    path('verify-email/', VerifyEmailView.as_view()),
    path('resend-verification/', ResendEmailVerificationView.as_view(),
         name='account_resend_email_verification'),
    path('account-confirm-email/<str:key>/', JsonConfirmEmailView.as_view()),
    path('account-confirm-email/', VerifyEmailView.as_view(),
         name='account_email_verification_sent'),
    re_path(r'^account-confirm-email/(?P<key>[-:\w]+)/$',
            VerifyEmailView.as_view(), name='account_confirm_email'),

    path('password-reset/', PasswordResetView.as_view()),
    path('password-reset/confirm/<uidb64>/<token>/',
         PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('password-change/', PasswordChangeView.as_view()),
]
