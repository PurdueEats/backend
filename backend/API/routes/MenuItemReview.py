from typing import List
from fastapi import APIRouter, Depends, HTTPException
from API.models.MenuItemReview import MenuItemReview
from API.routes.auth import AuthHandler
from API.routes.menu import get_nutrition, nutrition_to_macros
from DB.Util import runQuery

app = APIRouter()
auth_handler = AuthHandler()


# Get every MenuItemReview
@app.get("/", response_model=List[MenuItemReview])
async def get_meal_ratings():

    res = [dict(row) for row in runQuery("SELECT * FROM MenuItemsReviews")]
    res = [MenuItemReview.parse_obj({'user_id': item['UserID'], 'menu_item_id': item['MenuItemID'],
                                     'rating':item['Rating'], 'timestamp': item['Timestamp']})
           for item in res]

    return res


# Get all MenuItemReviews for a specific user
@app.get("/{UserID}", response_model=List[MenuItemReview])
async def get_user_meal_ratings(UserID: int = Depends(auth_handler.auth_wrapper)):

    # Check for valid UserID
    user_id = [dict(row) for row in runQuery(
        f"SELECT COUNT(*) FROM UserBasic WHERE UserID = {UserID}")]

    if user_id[0]['f0_'] != 1:
        raise HTTPException(status_code=400, detail='Invalid UserID')

    res = [dict(row) for row in runQuery(
        f"SELECT * FROM MenuItemsReviews WHERE UserID = {UserID}")]
    res = [MenuItemReview.parse_obj({'user_id': item['UserID'], 'menu_item_id': item['MenuItemID'],
                                     'rating':item['Rating'], 'timestamp': item['Timestamp']})
           for item in res]

    return res


# Add MenuItemReview to DB
@app.post("/", status_code=201)
async def add_meal_rating(menuItemReviews: List[MenuItemReview]):

    if len(menuItemReviews) == 0:
        return
    
    # Check for valid UserID
    user_id = [dict(row) for row in runQuery(
        f"SELECT COUNT(*) FROM UserBasic WHERE UserID = {menuItemReviews[0].user_id}")]
    
    if user_id[0]['f0_'] != 1:
        raise HTTPException(status_code=400, detail='Invalid UserID')

    calories, carbs, fat, protein = 0, 0, 0, 0

    for menuItemReview in menuItemReviews:

        # Check for valid MenuItemID
        menu_id = [dict(row) for row in runQuery(
        f"SELECT COUNT(*) FROM MenuItems WHERE MenuItemID = {menuItemReview.menu_item_id}")]

        if menu_id[0]['f0_'] != 1:
            raise HTTPException(status_code=400, detail='Invalid MenuItemID')

        # Insert MenuItem
        runQuery(f"""
        INSERT INTO MenuItemsReviews values 
        ({menuItemReview.menu_item_id}, {menuItemReview.user_id},
        {menuItemReview.rating}, '{menuItemReview.timestamp}')
        """)

        # Add User Nutrition insertion here
        response = get_nutrition(menuItemReview.menu_item_id)
        _calories, _carbs, _fat, _protein = nutrition_to_macros(response)

        calories += _calories
        carbs += _carbs
        fat +=  _fat
        protein += _protein


    res = [dict(row) for row in runQuery(
        f"SELECT * FROM UserNutrition WHERE UserID = {menuItemReview.user_id}")][0]

    calories += res['Calories']
    carbs += res['Carbs']
    fat += res['Fat']
    protein += res['Protein']

    runQuery(f"""
	DELETE FROM UserNutrition WHERE UserID = {menuItemReview.user_id};
    INSERT INTO UserNutrition values
	({menuItemReview.user_id}, {calories}, {carbs}, {fat}, {protein}
	)""")

    return
