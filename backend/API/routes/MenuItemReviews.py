from fastapi import FastAPI
from models.MenuItemReview import MealRating
#from MenuItemReview import MealRating

app = FastAPI()

data = []

#/MenuItemsReviews route
# get every meal rating
@app.get("/MenuItemReviews")
async def get_meal_ratings():
  return data

#add meal rating
@app.post("/MenuItemReviews")
async def add_meal_rating(meal_rating: MealRating):
  data.append(meal_rating.dict())
  return data[-1]

