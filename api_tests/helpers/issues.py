from api_tests.core.client import APIClient
from api_tests.core.endpoints import  ISSUE_BY_ID, ISSUE_CREATE
import requests

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
    if res.status_code not in range(200,300):
        raise AssertionError(f"CREATE_ISSUE failed: {res.status_code} - {res.text}")
    return res