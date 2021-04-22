from fastapi.testclient import TestClient
from backend.API.routes.api import router


client = TestClient(router)


def test_users_route():

    response = client.get("Users/")

    assert response.status_code == 200

    for user in response.json():

        assert 'user_id'    in user
        assert 'name'       in user
        assert 'email'      in user


def test_login_route():

    response = client.post(
        "Users/Login",
        json={
            'user_id': 0,
            'name' : "",
            'email': 'mark@mark.com',
            'password': 'string'
        })
    
    assert response.status_code == 200

    assert 'UserID' in response.json()
    assert 'token'  in response.json()
