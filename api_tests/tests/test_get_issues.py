from api_tests.helpers.issues import get_issue

def test_get_issues(client, issue_factory):
    title = "test_title_get"
    desc = "test_description_get"
    issue = issue_factory(title=title, description=desc)
    res = get_issue(client, issue["id"])
    assert res.status_code == 200

    res_again = get_issue(client, issue["id"])
    assert res_again.json() == res.json()
    
    invalid_id = 999999999
    res_two = get_issue(client, invalid_id)
    assert res_two.status_code == 404

