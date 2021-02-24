from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

data = []

class MealRating(BaseModel):
  meal_name: str
  meal_id: int
  # 0 to 5 scale
  rating: int

# get every meal rating from data
@app.get("/MenuItemReviews")
async def get_meal_ratings():
  return data

#get specific meal rating from data
@app.get("/MenuItemReviews/{menu_id}")
async def get_a_meal_rating(menu_id: int):
  return data[menu_id - 1]

#add meal rating to data
@app.post("/MenuItemReviews")
async def add_meal_rating(meal_rating: MealRating):
  data.append(meal_rating.dict())
  return data[-1]

#update a specific meal rating
@app.put("/MenuItemReviews/{menu_id}")
async def update_meal_rating(menu_id: int, meal_rating: MealRating):
  data[menu_id - 1] = meal_rating.dict()
  return data[menu_id - 1]
