from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from allauth.account.admin import EmailAddress
from users.tests import login_path

UserModel = get_user_model()

thread_path = '/api/messages/thread/'
user_profile_path = '/api/users/profile/'

# Create your tests here.


class MessageAPITestCase(APITestCase):
    def setUp(self):
        self.user1 = UserModel.objects.create_user(
            first_name="first",
            last_name="name",
            email="test@yale.edu",
            password="testpass1"
        )

        EmailAddress.objects.create(
            id=1,
            verified=1,
            primary=1,
            user_id=self.user1.id,
            email="test@yale.edu"
        )

        self.user2 = UserModel.objects.create_user(
            first_name="first",
            last_name="name",
            email="test2@yale.edu",
            password="testpass2"
        )

        EmailAddress.objects.create(
            id=2,
            verified=1,
            primary=1,
            user_id=self.user2.id,
            email="test2@yale.edu"
        )

    def authorize_user_1(self):
        self.client.post(
            login_path, {'email': "test@yale.edu", 'password': 'testpass1'})

    # TODO: https://linear.app/ymarket/issue/BAC-2/uncomment-tests-for-messages
    # def test_not_allowed_fetch_threads(self):
    #     self.authorize_user_1()
    #     response = self.client.get(thread_path, {})
    #     assert response.status_code == status.HTTP_405_METHOD_NOT_ALLOWED

    # def test_new_thread(self):
    #     self.authorize_user_1()

    #     title = 'title'
    #     sender = self.user1.id
    #     receiver = self.user2.id
    #     body = 'message from user 1 to user 2'
    #     data = {'title': title, 'sender': sender,
    #             'receiver': receiver, 'body': body}

    #     response = self.client.post(thread_path, data)
    #     assert response.status_code == status.HTTP_201_CREATED

    #     response_data = response.data
    #     assert response_data['sender'] == sender
    #     assert response_data['receiver'] == receiver
    #     assert response_data['messages'][0]['body'] == body
    #     # assert response_data['messages'][0]['thread'] == 1
    #     assert response_data['messages'][0]['sender'] == self.user1.id
    #     assert response_data['messages'][0]['receiver'] == self.user2.id

    # # Test removed because threads are now item-based, not user-based
    # # def test_duplicate_thread(self):
    # #     self.authorize_user_1()

    # #     sender = self.user1.id
    # #     receiver = self.user2.id
    # #     body = 'message from user 1 to user 2'
    # #     data = {'sender': sender, 'receiver': receiver, 'body': body}

    # #     response = self.client.post(thread_path, data)
    # #     assert response.status_code == status.HTTP_201_CREATED

    # #     response = self.client.post(thread_path, data)
    # #     assert response.status_code == status.HTTP_400_BAD_REQUEST

    # def test_add_new_message(self):
    #     self.authorize_user_1()

    #     title = 'title'
    #     sender = self.user1.id
    #     receiver = self.user2.id
    #     body = 'message from user 1 to user 2'
    #     data = {'title': title, 'sender': sender,
    #             'receiver': receiver, 'body': body}
    #     response = self.client.post(thread_path, data)
    #     assert response.status_code == status.HTTP_201_CREATED

    #     sender = self.user1.id
    #     receiver = self.user2.id
    #     body = 'second message from user 1 to user 2'
    #     thread = 1
    #     data = {'sender': sender, 'receiver': receiver,
    #             'body': body, 'thread': thread}
    #     response = self.client.put(thread_path + str(thread), data)
    #     assert response.status_code == status.HTTP_200_OK

    # def test_add_message_nonexistent_thread(self):
    #     self.authorize_user_1()

    #     title = 'title'
    #     sender = self.user1.id
    #     receiver = self.user2.id
    #     body = 'message from user 1 to user 2'
    #     data = {'title': title, 'sender': sender,
    #             'receiver': receiver, 'body': body}
    #     response = self.client.post(thread_path, data)
    #     assert response.status_code == status.HTTP_201_CREATED

    #     title = 'title'
    #     sender = self.user1.id
    #     receiver = self.user2.id
    #     body = 'second message from user 1 to user 2'
    #     thread = 39
    #     data = {'title': title, 'sender': sender,
    #             'receiver': receiver, 'body': body, 'thread': thread}
    #     response = self.client.post(thread_path + str(thread) + '/', data)
    #     assert response.status_code == status.HTTP_404_NOT_FOUND

    # def test_get_thread_by_user(self):
    #     self.authorize_user_1()

    #     title = 'title'
    #     sender = self.user1.id
    #     receiver = self.user2.id
    #     body = 'message from user 1 to user 2'
    #     data = {'title': title, 'sender': sender,
    #             'receiver': receiver, 'body': body}
    #     response = self.client.post(thread_path, data)
    #     assert response.status_code == status.HTTP_201_CREATED

    #     response_data = response.data
    #     # thread_id = response_data['messages'][0]['thread'] == 1
    #     response = self.client.get(
    #         user_profile_path + str(self.user1.id) + '/', {})
    #     assert response.status_code == status.HTTP_200_OK

    #     response_data = response.data
    #     # assert thread_id == response_data['sent_convos'][0]['id']

    #     response = self.client.get(
    #         user_profile_path + str(self.user2.id) + '/', {})
    #     assert response.status_code == status.HTTP_200_OK

    #     response_data = response.data
    #     # assert thread_id == response_data['received_convos'][0]['id']
