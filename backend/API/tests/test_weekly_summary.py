from fastapi.testclient import TestClient
from backend.API.routes.api import router


client = TestClient(router)


def test_weekly_summary_1():

    response = client.get("/WeeklyNutrition/2021-04-19")

    assert response.status_code == 200

    assert 'calories'   in response.json()
    assert 'carbs'      in response.json()
    assert 'fat'        in response.json()
    assert 'protein'    in response.json()


def test_weekly_summary_2():

    response = client.get("/WeeklyNutrition/2021-04-15")

    assert response.status_code == 200

    assert 'calories'   in response.json()
    assert 'carbs'      in response.json()
    assert 'fat'        in response.json()
    assert 'protein'    in response.json()