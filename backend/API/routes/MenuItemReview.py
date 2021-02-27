from fastapi import FastAPI
from API.models.MenuItemReview import MenuItemReview

 
app = FastAPI()


data = []
#Get every MenuItemReview
@app.get("/MenuItemReview")
async def get_meal_ratings():
  return data

#Add MenuItemReview to DB
@app.post("/MenuItemReview", status_code=201)
async def add_meal_rating(menuItemReview: MenuItemReview):
  data.append(menuItemReview.dict())
  return 
