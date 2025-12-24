import pytest
from api_tests.core.client import APIClient
from api_tests.helpers.issues import create_issue, delete_issue

@pytest.fixture(scope="session")
def client():
    return APIClient()

@pytest.fixture
def issue_factory(client):
    created_ids = []

    def _create(title = "api_automation_test", description = "api_test_description" ):
        issue = create_issue(client, title, description)
        created_ids.append(issue["id"])
        return issue
    
    yield _create #yield and return the _create function

    for id in created_ids:
        try: 
            delete_issue(client, id)
        except Exception:
            pass #ignore if the deletion fails, move on 


        