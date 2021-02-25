from fastapi import FastAPI
from MenuItemReviewsModel import MealRating

app = FastAPI()

data = []

# get every meal rating
@app.get("/MenuItemReviews")
async def get_meal_ratings():
  return data

#get specific meal rating
@app.get("/MenuItemReviews/{menu_id}")
async def get_a_meal_rating(menu_id: int):
  return data[menu_id - 1]

#add meal rating
@app.post("/MenuItemReviews")
async def add_meal_rating(meal_rating: MealRating):
  data.append(meal_rating.dict())
  return data[-1]

#update meal rating
@app.put("/MenuItemReviews/{menu_id}")
async def update_meal_rating(menu_id: int, meal_rating: MealRating):
  data[menu_id - 1] = meal_rating.dict()
  return data[menu_id - 1]
