from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

data = []

class User(BaseModel):
  # starts at 1
  userID: int
  username: str
  name: str
  email: str
  password: str
  mealplan: str

# get every user in data
@app.get("/users")
async def get_users():
  return data

#get specific user in data
@app.get("/users/{user_id}")
async def get_a_user(user_id: int):
  return data[user_id - 1]

#add user to data
@app.post("/users")
async def add_user(user: User):
  data.append(user.dict())
  return data[-1]

#update specific user
@app.put("/users/{user_id}")
async def update_user(user_id: int, user: User):
  data[user_id - 1] = user.dict()
  return data[user_id - 1]
