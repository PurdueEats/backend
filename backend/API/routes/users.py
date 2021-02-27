from typing import List
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse
from API.models.Users import (
    UserBasic
    UserExtra
    UserTransaction
    UserProfile
    UserTransaction
    UserFavMenuItems
  )


app = FastAPI()
auth_handler = AuthHandler()


@app.get("/", response_model=List[UserOut])
async def get_all_users():
  res = [dict(row) for row in runQuery("SELECT * FROM UserBasic")]
  res = [UserOut.parse_obj({'user_id': item['UserID'], 'name': item['Name'], 
    'email':item['Email']})
     for item in res]
    
  return res


@app.post("/Register", status_code=201)
async def create_user(userBasic: UserBasic):

  #Validate user email
  email = [dict(row) for row in runQuery(f"SELECT COUNT(*) FROM UserBasic WHERE Email = {userBasic.email}")]

  if email[0]['f0_'] != 0:
    raise HTTPException(status_code=400, detail='Email already in use')

  hashed_password = auth_handler.get_password_hash(userBasic.password)
  user_id = [dict(row) for row in runQuery("SELECT FARM_FINGERPRINT(TO_JSON_STRING(t)) as UserID")]

  runQuery(f"""
    INSERT INTO UserBasic values 
    ({user_id}, {userBasic.name},
     {userBasic.email}, {hashed_password})
     """)

  return {'UserID': user_id}


@app.post("/Login")
async def login_user(userBasic: UserBasic):

  #Fetch user using email
  user = [dict(row) for row in runQuery(f"SELECT * FROM UserBasic WHERE Email = {userBasic.email}")]

  if len(user) != 1:
    raise HTTPException(status_code=401, detail='Invalid username and/or password')

  if not auth_handler.verify_password(userBasic.password, user['Password']):
    raise HTTPException(status_code=401, detail='Invalid username and/or password')

  token = auth_handler.encode_token(user['Email'])


  return {'UserID': user_id, 'token': token }


#TODO: How to structure Auth routes?
@app.post("/{UserID}/Auth")
async def update_auth(userBasic: UserBasic):

  #Fetch user using email
  user = [dict(row) for row in runQuery(f"SELECT * FROM UserBasic WHERE UserID = {userBasic.user_id}")]

  if len(user) != 1:
    raise HTTPException(status_code=404, detail='User not found')

  runQuery(f"DELETE FROM UserBasic WHERE UserID = {userBasic.user_id}")

  runQuery(f"""
    INSERT INTO UserBasic values 
    ({user_id}, {userBasic.name},
     {userBasic.email}, {hashed_password})
     """)


@app.get("/{UserID}/MealPlan", response_model=UserExtra)
async def fetch_meal_plan(UserID: int = Depends(auth_handler.auth_wrapper)):

  user_extra = [dict(row) for row in runQuery(f"SELECT * FROM UserExtra WHERE UserID = {UserID}")]
  res = [UserExtra.parse_obj({'user_id':user_extra['UserID'], 'meal_plan_name':user_extra['MealPlanName']},
    'meal_swipe_count':user_extra['MealSwipeCount'], 'dining_dollar_amount':user_extra['DiningDollarBalance']
    )]

  return res[0]


@app.post("/{UserID}/MealPlan")
async def assing_meal_plan(UserID: int = Depends(auth_handler.auth_wrapper), mealPlanName: str)
  
  runQuery(f"DELETE from UserExtra WHERE UserID = {UserID}")
  res = [dict(row) for row in runQuery(f"SELECT * FROM MealPL")]
  runQuery(f"""
    INSERT INTO UserExtra value (
    {UserID}, '{'
    )
    """)

