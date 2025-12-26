from api_tests.helpers.issues import create_issue
from api_tests.core.endpoints import ISSUE_CREATE

def test_post_issues(client, issue_factory):
    #happy path
    #post issue with valid title and des
    title = "test_title_get"
    desc = "test_description_get"
    issue = issue_factory(title=title, description=desc)
    assert issue["id"]

    #negative testing and edge cases
    #post issues with invalid title
    payload = {
        "title": None,
        "description": "test_description_post"
    }
    res = client.post(ISSUE_CREATE, json=payload )
    assert res.status_code == 400 

    #post issue with invalid des
    payload = {
        "title": "test_title_post",
        "description": None
    }
    res = client.post(ISSUE_CREATE, json=payload )
    assert res.status_code == 400 
    #post issue with invalid title and des
    payload = {
        "title": None,
        "description": None
    }
    res = client.post(ISSUE_CREATE, json=payload )
    assert res.status_code == 400
