from fastapi.testclient import TestClient
from API.routtes.api import router


client = TestClient(router)


def test_get_dining_facilities():
    pass


def test_get_specific__dining_facility():
    pass


def test_get_incorrect_dining_facility():
    pass


def test_dining_facility_menu():
    pass


def test_dining_facility_menu_incorrect():
    pass




