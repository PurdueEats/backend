from fastapi.testclient import TestClient
from backend.API.routes.api import router


client = TestClient(router)


def test_recommendations_1():

    response = client.post(
        "Users/Login",
        json={
            'user_id': 0,
            'name': "",
            'email': 'mark@mark.com',
            'password': 'string'
        })

    assert response.status_code == 200
    assert 'token' in response.json()

    prediction = client.get(
        "Users/Predict",
        headers={
            "Authorization": "Bearer " + response.json()['token']
        })
    
    assert len(prediction.json()) == 5

    for fields in prediction.json():

        assert 'menu_item_id'   in fields
        assert 'hash_id'        in fields
        assert 'item_name'      in fields
        assert 'has_eggs'       in fields
        assert 'has_fish'       in fields
        assert 'has_gluten'     in fields
        assert 'has_milk'       in fields
        assert 'has_peanuts'    in fields
        assert 'has_shellfish'  in fields
        assert 'has_soy'        in fields
        assert 'has_treenuts'   in fields
        assert 'is_vegetarian'  in fields
        assert 'is_vegan'       in fields
        assert 'has_wheat'      in fields 


def test_recommendations_2():

    response = client.post(
        "Users/Login",
        json={
            'user_id': 0,
            'name': "",
            'email': 'test@test.com',
            'password': 'abcdefghi'
        })

    assert response.status_code == 200
    assert 'token' in response.json()

    prediction = client.get(
        "Users/Predict",
        headers={
            "Authorization": "Bearer " + response.json()['token']
        })
    
    assert len(prediction.json()) == 5

    for fields in prediction.json():

        assert 'menu_item_id'   in fields
        assert 'hash_id'        in fields
        assert 'item_name'      in fields
        assert 'has_eggs'       in fields
        assert 'has_fish'       in fields
        assert 'has_gluten'     in fields
        assert 'has_milk'       in fields
        assert 'has_peanuts'    in fields
        assert 'has_shellfish'  in fields
        assert 'has_soy'        in fields
        assert 'has_treenuts'   in fields
        assert 'is_vegetarian'  in fields
        assert 'is_vegan'       in fields
        assert 'has_wheat'      in fields
