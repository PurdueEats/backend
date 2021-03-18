from typing import List
from fastapi import APIRouter, HTTPException
from API.models.dining import DiningFacility, DiningFacilityMenuItem
from API.models.menu import MenuItem
from DB.Util import runQuery


app = APIRouter()


@app.get("/", response_model=List[DiningFacility])
async def get_dining_facilities():

    res = [dict(row) for row in runQuery("SELECT * FROM DiningFacilities")]
    res = [DiningFacility.parse_obj({
        'dining_facility_id':     item['DiningFacilityID'],
        'dining_facility_name':   item['DiningFacilityName'],
        'description':            item['Description'],
        'address':                item['Address'],
        'image':                  item['Image']
    }) for item in res]

    return res


@app.get("/{DiningFacilityID}", response_model=DiningFacility)
async def get_dining_facility(DiningFacilityID: int):

    res = [dict(row) for row in runQuery(
        f"SELECT * FROM DiningFacilities WHERE DiningFacilityID = {DiningFacilityID}")]

    if len(res) != 1:
        raise HTTPException(
            status_code=400, detail='Dining Facility not found')

    res = [DiningFacility.parse_obj({
        'dining_facility_id':     item['DiningFacilityID'],
        'dining_facility_name':   item['DiningFacilityName'],
        'description':            item['Description'],
        'address':                item['Address'],
        'image':                  item['Image']
    }) for item in res]

    return res[0]


@app.get("/{DiningFacilityID}/Menu", response_model=List[DiningFacilityMenuItem])
async def get_dining_facility_menu(DiningFacilityID: int):

    dining_facility = [dict(row) for row in runQuery(
        f"SELECT COUNT(*) FROM DiningFacilities WHERE DiningFacilityID = {DiningFacilityID}")]

    if dining_facility[0]['f0_'] != 1:
        raise HTTPException(
            status_code=400, detail='Dining Facility not found')

    res = [dict(row) for row in runQuery(
        f"""
        SELECT * 
        FROM DiningFacilityMenuItems as DFI, MenuItems as MI
        WHERE DFI.MenuItemID = MI.MenuItemID
        """)]

    menu_items = [MenuItem.parse_obj({
        'menu_item_id':   item['MenuItemID'],
        'hash_id':        item['HashID'],
        'item_name':      item['ItemName'],
        'has_eggs':       item['Eggs'],
        'has_fish':       item['Fish'],
        'has_gluten':     item['Gluten'],
        'has_milk':       item['Milk'],
        'has_peanuts':    item['Peanuts'],
        'has_shellfish':  item['Shellfish'],
        'has_soy':        item['Soy'],
        'has_treenuts':   item['TreeNuts'],
        'is_vegetarian':  item['Vegetarian'],
        'is_vegan':       item['Vegan'],
        'has_wheat':      item['Wheat']
    }) for item in res]


    def builder(item): return DiningFacilityMenuItem(
        {'menu_item': item[1], 'timing': item[0]['Timing'], 'station': item[0]['Station']})
    
    res = list(map(builder, zip(res, menu_items)))

    return res