from fastapi.testclient import TestClient
from backend.API.routes.api import router


client = TestClient(router)


def test_weekly_summary():

    pass