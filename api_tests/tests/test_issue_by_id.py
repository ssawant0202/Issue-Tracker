
import requests
from api_tests.config.configurations import get_config
from api_tests.helpers.issues import create_issue, delete_issue

#how to call this file: python3 -m api_tests.tests.test_issue_by_id

#Form the URL
config = get_config()
base_url  = config['API']['base_url']
issue_endpoint = config['ENDPOINTS']['issue_by_id']

#Create a test User
issue = create_issue("api_automation_test_title", "api automation descripton")
issue_id = issue["id"]

try:
    url =  base_url + issue_endpoint.format(id = issue_id)
    response = requests.get(url)
    data = response.json()

    #assert 
    assert response.status_code == 200
    assert data["id"] == issue_id
    assert data["title"]
    assert data["description"]
    assert data["createdAt"]
finally:
    #delete the issue
    delete_issue(issue_id)



