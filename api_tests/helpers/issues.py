# from config.configurations import get_configz

# how to call: python3 -m api_tests.helpers.issues
from api_tests.config.configurations import get_config
import requests

def create_test_user(email, password):
    config = get_config()
    base_url = config['API']['base_url']
    endpoint = config['ENDPOINTS']['register_user']
    url =  base_url + endpoint

    payload = {
        "email": email, 
        "password": password
    }

    response = requests.post(url, json = payload)
    return response

def create_issue(title, description):
    config = get_config()
    URL = config['API']['base_url'] + config['ENDPOINTS']['issue_create']

    payload = {
        "title": title, 
        "description": description
    }
    response = requests.post(URL, json=payload)
    return response.json()

def delete_issue(issue_id):
    config = get_config()
    URL = config['API']['base_url'] + config['ENDPOINTS']['issue_by_id'].format(id=issue_id)
    response = requests.delete(URL)
    return response.json()

