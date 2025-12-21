import configparser
import requests


config = configparser.ConfigParser()
read_files = config.read('../config/properties.ini')

base_url  = config['API']['base_url']
issue_endpoint = config['ENDPOINTS']['issue_by_id']
issue_id = 1

url =  base_url + issue_endpoint.format(id = issue_id)
response = requests.get(url)
data = response.json()

assert response.status_code == 200
assert data["id"] == issue_id
assert data["title"]
assert data["description"]
assert data["createdAt"]


# { example get response: 
#     "id": 1,
#     "title": "Login page not loading",
#     "description": "Users are reporting that the login page shows a blank screen after entering credentials. This started happening after the last deployment. Edited",
#     "status": "OPEN",
#     "createdAt": "2025-12-19T19:02:05.000Z",
#     "updatedAt": "2025-12-21T06:52:09.883Z",
#     "assignedToUserId": null
# }


