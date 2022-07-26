import configparser
import requests 
import json 
from base64 import b64encode
import os 

def upload_image_imgur(image_file_in_memory): 
    config = configparser.ConfigParser() 
    ini_file = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'auth.ini')
    config.read(ini_file)
    client_id = config.get('credentials', 'client_id')
    client_secret = config.get('credentials', 'client_secret')
    refresh_token = config.get('credentials', 'refresh_token')

    access_token = get_access_token(refresh_token, client_id, client_secret)

    url = "https://api.imgur.com/3/image"

    handle_uploaded_file(image_file_in_memory)

    payload={
        'image': b64encode(open('media/data/posts/' + image_file_in_memory.name, 'rb').read()),
        'type': 'base64', 
        'name': image_file_in_memory.name,
        }
    files=[

    ]
    headers = {
    'Authorization': 'Bearer ' + access_token
    }

    os.remove('media/data/posts/' + image_file_in_memory.name)

    response = requests.request("POST", url, headers=headers, data=payload, files=files)
    json_response = json.loads(response.text) 
    
    return json_response['data']['link']

def handle_uploaded_file(f):
    destination = open('media/data/posts/' + f.name, 'wb+')
    for chunk in f.chunks():
        destination.write(chunk)
    destination.close()

def get_access_token(refresh_token, client_id, client_secret): 
    url = "https://api.imgur.com/oauth2/token"

    payload={'refresh_token': refresh_token,
    'client_id': client_id,
    'client_secret': client_secret,
    'grant_type': 'refresh_token'}
    files=[

    ]
    headers = {}

    response = requests.request("POST", url, headers=headers, data=payload, files=files)
    json_response = json.loads(response.text) 
    
    return json_response['access_token']
