from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from allauth.account.admin import EmailAddress
from users.tests import login_path

post_path = '/api/post/'

UserModel = get_user_model()

# Create your tests here.


class PostApiTestCase(APITestCase):
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
            user_id=self.user.id,
            email="test@yale.edu"
        )

    def authorize(self):
        self.client.post(
            login_path, {'email': "test@yale.edu", 'password': 'testpass1'})

    # TODO: https://linear.app/ymarket/issue/BAC-1/uncomment-tests-for-posts
    # def test_get_list(self):
    #     self.authorize()
    #     response = self.client.get(post_path, {})
    #     assert response.status_code == status.HTTP_200_OK

    # def test_unauthenticated_get_list(self):
    #     response = self.client.get(post_path, {})
    #     assert response.status_code == status.HTTP_401_UNAUTHORIZED

    # def test_post_list(self):
    #     self.authorize()

    #     title = 'first test post'
    #     content = 'first test content'
    #     price = 5.25
    #     category = 'testing'

    #     data = {'title': title, 'content': content, 'price': price, 'category': category}
    #     response = self.client.post(post_path, data)
    #     assert response.status_code == status.HTTP_201_CREATED

    #     response_data = response.data

    #     assert response_data['title'] == title
    #     assert response_data['content'] == content
    #     assert response_data['author']['email'] == 'test@yale.edu'
    #     assert response_data['author']['first_name'] == 'first'
    #     assert response_data['author']['last_name'] == 'name'
    #     assert float(response_data['price']) == price
    #     assert response_data['category'] == category

    # def test_invalid_post_list(self):
    #     self.authorize()

    #     content = 'first test content'
    #     price = 5.25
    #     category = 'testing'

    #     data = {'content': content, 'price': price, 'category': category}
    #     response = self.client.post(post_path, data)
    #     assert response.status_code == status.HTTP_400_BAD_REQUEST

    # def test_get_detail(self):
    #     self.authorize()

    #     title = 'first test post'
    #     content = 'first test content'
    #     price = 5.25
    #     category = 'testing'

    #     data = {'title': title, 'content': content, 'price': price, 'category': category}
    #     response = self.client.post(post_path, data)
    #     assert response.status_code == status.HTTP_201_CREATED

    #     post_id = response.data['id']
    #     response = self.client.get(post_path + str(post_id), {})
    #     assert response.status_code == status.HTTP_200_OK

    #     response_data = response.data

    #     assert response_data['title'] == title
    #     assert response_data['content'] == content
    #     assert response_data['author']['email'] == 'test@yale.edu'
    #     assert response_data['author']['first_name'] == 'first'
    #     assert response_data['author']['last_name'] == 'name'
    #     assert float(response_data['price']) == price
    #     assert response_data['category'] == category

    # def test_invalid_get_detail(self):
    #     self.authorize()
    #     post_id = 1
    #     response = self.client.get(post_path + str(post_id), {})
    #     assert response.status_code == status.HTTP_404_NOT_FOUND

    # def test_put_detail(self):
    #     self.authorize()

    #     title = 'first test post'
    #     content = 'first test content'
    #     price = 5.25
    #     category = 'testing'

    #     data = {'title': title, 'content': content, 'price': price, 'category': category}
    #     response = self.client.post(post_path, data)
    #     assert response.status_code == status.HTTP_201_CREATED

    #     post_id = response.data['id']
    #     new_title = 'new test post title'
    #     new_content = 'this content should be changed'
    #     data = {'title': new_title, 'content': new_content}
    #     response = self.client.put(post_path + str(post_id), data)
    #     assert response.status_code == status.HTTP_200_OK

    #     response_data = response.data

    #     assert response_data['title'] == new_title
    #     assert response_data['content'] == new_content
    #     assert response_data['author']['email'] == 'test@yale.edu'
    #     assert response_data['author']['first_name'] == 'first'
    #     assert response_data['author']['last_name'] == 'name'
    #     assert float(response_data['price']) == price
    #     assert response_data['category'] == category

    # def test_delete_detail(self):
    #     self.authorize()

    #     title = 'first test post'
    #     content = 'first test content'
    #     price = 5.25
    #     category = 'testing'

    #     data = {'title': title, 'content': content, 'price': price, 'category': category}
    #     response = self.client.post(post_path, data)
    #     assert response.status_code == status.HTTP_201_CREATED

    #     post_id = response.data['id']
    #     response = self.client.delete(post_path + str(post_id), {})
    #     assert response.status_code == status.HTTP_204_NO_CONTENT

    #     response = self.client.get(post_path + str(post_id), {})
    #     assert response.status_code == status.HTTP_404_NOT_FOUND

    # def test_delete_get_detail(self):
    #     self.authorize()
    #     post_id = 1
    #     response = self.client.delete(post_path + str(post_id), {})
    #     assert response.status_code == status.HTTP_404_NOT_FOUND
