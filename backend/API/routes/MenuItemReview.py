from typing import List
from fastapi import FastAPI
from API.models.MenuItemReview import MenuItemReview
from DB.Util import runQuery
 
app = FastAPI()


data = []
#Get every MenuItemReview
@app.get("/MenuItemReview", response_model=List[MenuItemReview])
async def get_meal_ratings():

  res = [dict(row) for row in runQuery("SELECT * FROM MenuItemsReviews")]
  res = [MenuItemReview.parse_obj({'user_id': item['UserID'], 'menu_item_id': item['MenuItemID'], 
  	'rating':item['Rating'], 'timestamp': item['Timestamp']})
  	 for item in res]
  	
  return res

#Add MenuItemReview to DB
@app.post("/MenuItemReview", status_code=201)
async def add_meal_rating(menuItemReview: MenuItemReview):
  runQuery(f"""
  	INSERT INTO MenuItemsReviews values 
  	({menuItemReview.user_id}, {menuItemReview.menu_item_id},
  	 {menuItemReview.rating}, '{menuItemReview.timestamp}')
  	 """)

  return 
