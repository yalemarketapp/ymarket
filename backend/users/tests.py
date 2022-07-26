from allauth.account.admin import EmailAddress
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model

UserModel = get_user_model()

register_path = '/api/users/register/'
login_path = '/api/users/login/'
logout_path = '/api/users/logout/'
password_change_path = '/api/users/password-change/' 

# API tests
class RegistrationTestCase(APITestCase):
    def test_valid_registration(self):
        data = {'email': "test@gmail.com", 'first_name': 'first', 'last_name': 'name', 'password1': 'testpass1', 'password2': 'testpass1'}
        response = self.client.post(register_path, data)
        assert response.status_code == status.HTTP_201_CREATED

    def test_invalid_first_name(self):
        data = {'email': "test@gmail.com", 'first_name': '', 'last_name': 'name', 'password1': 'testpass1', 'password2': 'testpass1'}
        response = self.client.post(register_path, data)
        assert response.status_code == status.HTTP_400_BAD_REQUEST
    
    def test_invalid_last_name(self):
        data = {'email': "test@gmail.com", 'first_name': 'first', 'last_name': '', 'password1': 'testpass1', 'password2': 'testpass1'}
        response = self.client.post(register_path, data)
        assert response.status_code == status.HTTP_400_BAD_REQUEST
    
    def test_duplicate_email(self):
        data = {'email': "test@gmail.com", 'first_name': 'first', 'last_name': 'name', 'password1': 'testpass1', 'password2': 'testpass1'}
        response = self.client.post(register_path, data)
        data = {'email': "test@gmail.com", 'first_name': 'first', 'last_name': 'name', 'password1': 'testpass1', 'password2': 'testpass1'}
        response = self.client.post(register_path, data)
        assert response.status_code == status.HTTP_400_BAD_REQUEST
    
    def test_different_password(self):
        data = {'email': "test@gmail.com", 'first_name': 'first', 'last_name': 'name', 'password1': 'testpass1', 'password2': 'testpass2'}
        response = self.client.post(register_path, data)
        assert response.status_code == status.HTTP_400_BAD_REQUEST

class LoginLogoutTestCase(APITestCase):
    def setUp(self):
        self.user = UserModel.objects.create_user(
            first_name="first",
            last_name="name",
            email="test@yale.edu",
            password='testpass1'
        )

        EmailAddress.objects.create(
            id=1,
            verified=1,
            primary=1,
            user_id = self.user.id,
            email="test@yale.edu"
        )

    def test_valid_login(self):
        data = {'email': "test@yale.edu", 'password': 'testpass1'}
        response = self.client.post(login_path, data)
        assert response.status_code == status.HTTP_200_OK
    
    def test_invalid_email(self):
        data = {'email': "", 'password': 'testpass1'}
        response = self.client.post(login_path, data)
        assert response.status_code == status.HTTP_400_BAD_REQUEST
    
    def test_invalid_password(self):
        data = {'email': "test@yale.edu", 'password': ''}
        response = self.client.post(login_path, data)
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_valid_logout(self):
        response = self.client.post(logout_path)
        assert response.status_code == status.HTTP_200_OK

    def test_invalid_logout(self):
        response = self.client.get(logout_path)
        assert response.status_code == status.HTTP_405_METHOD_NOT_ALLOWED

class PasswordTestCase(APITestCase):
    def setUp(self):
        self.user = UserModel.objects.create_user(
            first_name="first",
            last_name="name",
            email="test@yale.edu",
            password="testpass1"
        )

        EmailAddress.objects.create(
            id=1,
            verified=1,
            primary=1,
            user_id = self.user.id,
            email="test@yale.edu"
        )

    def authorize(self):
        self.client.post(login_path, {'email': "test@yale.edu", 'password': 'testpass1'})
    
    def test_valid_password_change(self):
        self.authorize()
        data = {'new_password1': 'testpass2', 'new_password2': 'testpass2'}
        response = self.client.post(password_change_path, data)
        assert response.status_code == status.HTTP_200_OK

        data = {'email': "test@yale.edu", 'password': 'testpass1'}
        response = self.client.post(login_path, data)
        assert response.status_code == status.HTTP_400_BAD_REQUEST
    
    def test_unauthorized_password_change(self):
        data = {'new_password1': 'testpass2', 'new_password2': 'testpass2'}
        response = self.client.post(password_change_path, data)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
