from fastapi.testclient import TestClient
from API.routtes.api import router


client = TestClient(router)


def test_get_dining_facilities():
    
    response = client.get("DF/")

    assert response.status_code == 200

    facilities = set('Earhart', 'Hillenbrand', 'Ford', 'Wiley', 'Windsor')
    for facility in response.json():
        
        assert 'dining_facility_id'     in facility
        assert 'dining_facility_name'   in facility
        assert'description'             in facility
        assert'address'                 in facility
        assert'image'                   in facility
    
        assert facility['dining_facility_name'] in facilities
        facilities.remove(facility['dining_facility_name'])


def test_get_specific__dining_facility():
    pass


def test_get_incorrect_dining_facility():
    pass


def test_dining_facility_menu():
    pass


def test_dining_facility_menu_incorrect():
    pass




