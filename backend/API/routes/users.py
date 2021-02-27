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


@app.get("/", response_model=List[UserOut])
async def get_all_users():
  res = [dict(row) for row in runQuery("SELECT * FROM UserBasic")]
  res = [UserOut.parse_obj({'user_id': item['UserID'], 'name': item['Name'], 
    'email':item['Email']})
     for item in res]
    
  return res


@app.get("/Register", status_code=201)
async def create_user(userBasic: UserBasic):
  

