from api_tests.helpers.issues import delete_issue, get_issue


def test_delete_issues(client, issue_factory):
    #happy path
    #create a new test issue
    title = "test_title_get"
    desc = "test_description_get"
    issue = issue_factory(title=title, description=desc)
    issue_id_1 = issue["id"]

    #delete the issue, confirm deletion 
    res = delete_issue(client, issue_id_1 )
    assert res.status_code == 200

    #shouldnt retrive deleted_id
    res = get_issue(client, issue_id_1)
    assert res.status_code == 400 or res.status_code == 404
    

def test_delete_issue_invalid_id(client):
    res = client.delete("/api/issues/999999")
    assert res.status_code == 400 or res.status_code == 404