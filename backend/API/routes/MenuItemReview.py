from typing import List
from fastapi import APIRouter, HTTPException
from API.models.MenuItemReview import MenuItemReview
from DB.Util import runQuery

app = APIRouter()


#Get every MenuItemReview
@app.get("/", response_model=List[MenuItemReview])
async def get_meal_ratings():

  res = [dict(row) for row in runQuery("SELECT * FROM MenuItemsReviews")]
  res = [MenuItemReview.parse_obj({'user_id': item['UserID'], 'menu_item_id': item['MenuItemID'], 
  	'rating':item['Rating'], 'timestamp': item['Timestamp']})
  	 for item in res]
  	
  return res

#Add MenuItemReview to DB
@app.post("/", status_code=201)
async def add_meal_rating(menuItemReview: MenuItemReview):

  #Check for valid UserID and MenuItemId
  print(menuItemReview.user_id)
  user_id = [dict(row) for row in runQuery(f"SELECT COUNT(*) FROM UserBasic WHERE UserID = {menuItemReview.user_id}")]
  menu_id = [dict(row) for row in runQuery(f"SELECT COUNT(*) FROM MenuItems WHERE MenuItemID = {menuItemReview.menu_item_id}")]

  if user_id[0]['f0_'] != 1:
    raise HTTPException(status_code=400, detail='Invalid UserID')
  if menu_id[0]['f0_'] != 1:
    raise HTTPException(status_code=400, detail='Invalid MenuItemID')

  runQuery(f"""
  	INSERT INTO MenuItemsReviews values 
  	({menuItemReview.menu_item_id}, {menuItemReview.user_id},
  	 {menuItemReview.rating}, '{menuItemReview.timestamp}')
  	 """)

  return 
