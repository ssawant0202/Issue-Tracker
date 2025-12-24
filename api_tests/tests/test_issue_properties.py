from api_tests.helpers.issues import get_issue

def test_idk(client, issue_factory):
    title = "title_from_test"
    desc = "desc_from_test"
    issue = issue_factory(title=title, description=desc)
    
    res = get_issue(client, issue["id"])
    data = res.json()

    assert data["id"] == issue["id"]
    assert data["title"] == title
    assert data["description"] == desc
    assert data["createdAt"]
