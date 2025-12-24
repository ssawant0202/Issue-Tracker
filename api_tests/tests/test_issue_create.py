
import requests
from api_tests.config.configurations import get_config


#how to call this file: python3 -m api_tests.tests.test_issue_by_id

#Form the URL
config = get_config()
base_url  = config['API']['base_url']
issue_endpoint = config['ENDPOINTS']['issue_create']
url = base_url + issue_endpoint

#happypath 
def test_valid_issue():
    response = requests.post(url, json={"title": "Test Title", "description": "Test description"})
    assert response.status_code in range(200, 300)

#missing title
def test_missing_title():
    response = requests.post(url, json={"description": "Test description"})
    assert response.status_code not in range(200, 300)

#missing description
def test_missing_description():
    response = requests.post(url, json={"title": "Test Title"})
    assert response.status_code not in range(200, 300)

# missing both
def test_missing_both():
    response = requests.post(url, json={})
    assert response.status_code not in range(200, 300)


