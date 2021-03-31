from fastapi.testclient import TestClient
from API.routes.api import router


client = TestClient(router)


def test_get_dining_facilities():
    
    response = client.get("DF/")

    assert response.status_code == 200

    facilities = set(['Earhart', 'Hillenbrand', 'Ford', 'Wiley', 'Windsor'])
    for facility in response.json():
        
        assert 'dining_facility_id'     in facility
        assert 'dining_facility_name'   in facility
        assert 'description'            in facility
        assert 'address'                in facility
        assert 'image'                  in facility
    
        assert facility['dining_facility_name'] in facilities
        facilities.remove(facility['dining_facility_name'])


def test_get_specific__dining_facility():
    
    facilities = set(['Earhart', 'Hillenbrand', 'Ford', 'Wiley', 'Windsor'])

    for i in range(1,6):

        response = client.get(f"DF/{i}")
        assert response.status_code == 200

        response = response.json()
        
        assert 'dining_facility_id'     in response
        assert 'dining_facility_name'   in response
        assert 'description'            in response
        assert 'address'                in response
        assert 'image'                  in response
    
        assert response['dining_facility_name'] in facilities
        facilities.remove(response['dining_facility_name'])

    

def test_get_incorrect_dining_facility():
    
    import random
    index = -1

    while True:
        index = random.randrange(-100,100)
        if index > 5 or index < 0:
            break
    
    response = client.get(f"DF/{index}")

    assert response.status_code == 404
    assert 'detail' in response.json()
    assert response.json()['detail'] == 'Dining Facility not found'


def test_dining_facility_menu():
    
    for i in range(1,6):

        response = client.get(f"DF/{i}/Menu")
        assert response.status_code == 200

        for item in response.json():

            assert 'menu_item' in item

            fields = item['menu_item']
            print(fields)

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
            
            assert 'timing'     in item
            assert 'station'    in item


def test_dining_facility_menu_incorrect():
    
    import random
    index = -1

    while True:
        index = random.randrange(-100,100)
        if index > 5 or index < 0:
            break
    
    response = client.get(f"DF/{index}/Menu")

    assert response.status_code == 404
    assert 'detail' in response.json()
    assert response.json()['detail'] == 'Dining Facility not found'


