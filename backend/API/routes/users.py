from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse
from models.Users import UserIn, UserOut
from models.UserExtra import UserExtra
from models.UserProfile import UserProfile
from models.UserFavoriteMenuItems import UserFavMeal
from models.AppFeedback import Feedback
from models.UserSchedule import UserSchedule
from models.UserTransaction import UserTransaction
from typing import List

app = FastAPI()

#Lists
data = []
mealplan_data = []
profilepic_data = []
favmeal_data = []
feedback_data = []
schedule_data = []
transaction_data = []

#
#/Users route
#
# get every user
@app.get("/Users", response_model=List[UserOut])
async def get_users():
  return data

#
#/Users/Login route
#
@app.post("/Users/Login")
async def post_user_login():
  return

#
#/Users/Registers route
#
#add user to data
@app.post("/Users/Register", response_model=UserOut)
async def add_user(user: UserIn):
  data.append(user.dict())
  return data[-1]

#
#/Users/{UserID} route
#
#get specific user
@app.get("/Users/{UserID}", response_model=UserOut)
async def get_a_user(user_id: int):
  return data[user_id - 1]

#update a specific user
@app.put("/Users/{UserID}", response_model=UserOut)
async def update_user(user_id: int, user: UserIn):
  data[user_id - 1] = user.dict()
  return data[user_id - 1]

#delete a specific user
@app.delete("/Users/{UserID}", response_model=UserOut)
async def delete_user(user_id: int):
  del data[user_id - 1]
  return {"info": "Successfully deleted"}

#
#/Users/{UserID}/Auth route
#
#get user's authentication
@app.get("/Users/{UserID}/Auth")
async def get_user_auth():
  return

#update user authentication
@app.post("/Users/{UserID}/Auth")
async def post_user_auth():
  return

#
#/Users/{UserID}/FavMeals route
#
#get user's favorite meals
@app.get("/Users/{UserID}/FavMeals")
async def get_user_favmeal(user_id: int):
  return favmeal_data[user_id - 1];

#post user's favorite meals
@app.post("/Users/{UserID}/FavMeals")
async def post_user_favmeal(favmeals: UserFavMeal):
  favmeal_data.append(favmeals.dict())
  return favmeal_data[-1]

#update user's favorite meals
@app.put("/Users/{UserID}/FavMeals")
async def update_user_favmeal(user_id: int, favmeals: UserFavMeal):
  favmeal_data[user_id - 1] = favmeals.dict()
  return favmeal_data[-1]

#
#/Users/{UserID}/Feedback
#
#post user's feedback
@app.post("/Users/{UserID}/Feedback")
async def post_user_feedback(feedback: Feedback):
  feedback_data.append(feedback.dict())
  return feedback_data[-1]

#
#/Users/{UserID}/MealPlan route
#
#get user's mealplan
@app.get("/Users/{UserID}/MealPlan")
async def get_user_mealplan(user_id: int):
  return mealplan_data[user_id - 1]

#post user's mealplan
@app.post("/Users/{UserID}/MealPlan")
async def post_user_mealplan(mealplan: UserExtra):
  mealplan_data.append(mealplan.dict())
  return mealplan_data[-1]

#
#/Users/{UserID}/ProfilePic route
#
#get user's profile pic
@app.get("/Users/{UserID}/ProfilePic")
async def get_user_profile_pic(user_id: int):
  return  profilepic_data[user_id - 1]

#post user's profile pic
@app.post("/Users/{UserID}/ProfilePic")
async def post_upload_profilepic(profilepic: UserProfile):
  profilepic_data.append(profilepic.dict())
  return profilepic_data[-1]

#
#/Users/{UserID}/Schedule route
#
#get user's schedule
@app.get("/Users/{UserID}/Schedule")
async def get_user_schedule(user_id: int):
  return schedule_data[user_id - 1]

#post user's schedule
@app.post("/Users/{UserID}/Schedule")
async def post_user_schedule(schedule: UserSchedule):
  schedule_data.append(schedule.dict())
  return schedule_data[-1]

#
#/Users/{UserID}/Trans
#
#get user's transactions
@app.get("/Users/{UserID}/Trans")
async def get_user_trans(user_id: int):
  return transaction_data[user_id - 1]

#post user's transactions
@app.post("/Users/{UserID}/Trans")
async def post_user_trans(transaction: UserTransaction):
  transaction_data.append(transaction.dict())
  return transaction_data[-1]

