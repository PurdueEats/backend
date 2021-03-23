from typing import List
from fastapi import APIRouter, HTTPException
from requests import get
from DB.Util import runQuery
from API.models.menu import MenuItem

app = APIRouter()
NUTRITION_URL = "https://api.hfs.purdue.edu/menus/v2/items/"


@app.get("/", response_model=List[MenuItem])
async def get_menu_items():

    res = [dict(row) for row in runQuery(
        f"""SELECT * FROM MenuItems""")]

    res = [MenuItem.parse_obj({
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

    return res


@app.get("/{MenuItemID}", response_model=MenuItem)
async def get_menu_item(MenuItemID: int):

    res = [dict(row) for row in runQuery(
        f"""SELECT * FROM MenuItems WHERE MenuItemID = {MenuItemID}""")]

    if len(res) != 1:
        raise HTTPException(status_code=404, detail='MenuItem not found')

    res = [MenuItem.parse_obj({
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

    return res[0]


@app.get("/{MenuItemID}/Nutrition", status_code=200)
async def get_menu_item_nutrition(MenuItemID: int):

    return get_nutrition(MenuItemID)


# Proxy function for nutrition fetching
def get_nutrition(MenuItemID: int):

    res = [dict(row) for row in runQuery(
        f"""SELECT HashID FROM MenuItems WHERE MenuItemID = {MenuItemID}""")]

    if len(res) != 1:
        raise HTTPException(status_code=404, detail='MenuItem not found')

    return get(NUTRITION_URL + res[0]['HashID']).json()


def nutrition_to_macros(response):

    response = response['Nutrition']
    calories, carbs, fat, protein = 0, 0, 0, 0

    for term in response:
        if term['Name'] == 'Calories':
            calories = int(term['Value'])
        elif term['Name'] == 'Total fat':
            fat = int(term['Value'])
        elif term['Name'] == 'Total Carbohydrate':
            carbs = int(term['Value'])
        elif term['Name'] == 'Protein':
            protein = int(term['Value'])

    return (calories, carbs, fat, protein)
