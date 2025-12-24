# from config.configurations import get_configz

# how to call: python3 -m api_tests.helpers.issues
# from api_tests.config.configurations import get_config

from api_tests.core.client import APIClient
from api_tests.core.endpoints import  ISSUE_BY_ID, ISSUE_CREATE
import requests

# def create_test_user(email, password):
#     config = get_config()
#     base_url = config['API']['base_url']
#     endpoint = config['ENDPOINTS']['register_user']
#     url =  base_url + endpoint

#     payload = {
#         "email": email, 
#         "password": password
#     }

#     response = requests.post(url, json = payload)
#     return response

# def create_issue(title, description):
#     config = get_config()
#     URL = config['API']['base_url'] + config['ENDPOINTS']['issue_create']

#     payload = {
#         "title": title, 
#         "description": description
#     }
#     response = requests.post(URL, json=payload)
#     if response.status_code != 201:
#         raise AssertionError(
#             f"CREATE issue failed: {response.status_code} - {response.text}"
#     )
#     return response.json()

# def delete_issue(issue_id):
#     config = get_config()
#     URL = config['API']['base_url'] + config['ENDPOINTS']['issue_by_id'].format(id=issue_id)
#     response = requests.delete(URL)
#     if response.status_code not in (200, 204):
#         raise AssertionError(
#             f"DELETE issue failed: {response.status_code} - {response.text}"
#     )
#     return response.json()

def create_issue(client: APIClient, title: str, description: str) -> dict: 
    payload = {
        "title": title,
        "description": description
    }
    res = client.post(ISSUE_CREATE, json=payload )
    if res.status_code != 201:
        raise AssertionError(f"CREATE_ISSUE failed: {res.status_code} - {res.text}")
    return res.json()

def get_issue(client: APIClient, issue_id: int):
    path = ISSUE_BY_ID.format(id = issue_id)
    res = client.get(path)
    return res

def delete_issue(client:APIClient, issue_id: int):
    path = ISSUE_BY_ID.format(id = issue_id)
    res = client.delete(path)
    if res not in range(200,300):
        raise AssertionError(f"CREATE_ISSUE failed: {res.status_code} - {res.text}")
    return res