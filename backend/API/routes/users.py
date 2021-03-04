""" User routes module. Contains all user resource related routes"""
from typing import List
from fastapi import FastAPI, Depends, HTTPException
from API.routes.auth import AuthHandler
from DB.Util import runQuery
from API.models.MealPlan import MealPlanIn
from API.models.users import (
    UserBasic,
    UserExtra,
    UserProfile,
    UserSchedule,
    UserTransaction,
    UserFavMenuItems,
    UserOut
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

    # Validate user email
    email = [dict(row) for row in runQuery(
        f"SELECT COUNT(*) FROM UserBasic WHERE Email = '{userBasic.email}'")]

    if email[0]['f0_'] != 0:
        raise HTTPException(status_code=400, detail='Email already in use')

    hashed_password = auth_handler.get_password_hash(userBasic.password)
    user_id = [dict(row) for row in runQuery(
        "SELECT FARM_FINGERPRINT(GENERATE_UUID()) as UserID")]

    runQuery(f"""
    INSERT INTO UserBasic values 
    ({user_id[0]['UserID']}, '{userBasic.name}',
     '{userBasic.email}', '{hashed_password}')
     """)

    return {'UserID': user_id}


@app.post("/Login")
async def login_user(userBasic: UserBasic):

    # Fetch user using email
    user = [dict(row) for row in runQuery(
        f"SELECT * FROM UserBasic WHERE Email = '{userBasic.email}'")]

    if len(user) != 1:
        raise HTTPException(
            status_code=401, detail='Invalid username and/or password')

    user = user[0]

    if not auth_handler.verify_password(userBasic.password, user['Password']):
        raise HTTPException(
            status_code=401, detail='Invalid username and/or password')

    token = auth_handler.encode_token(user['Email'], user['UserID'])

    return {'UserID': user['UserID'], 'token': token}


@app.delete("/{UserID}")
async def delete_user(UserID: int = Depends(auth_handler.auth_wrapper)):
    # Fetch user using email
    user = [dict(row) for row in runQuery(
        f"SELECT * FROM UserBasic WHERE UserID = {UserID}")]

    if len(user) != 1:
        raise HTTPException(status_code=404, detail='User not found')

    runQuery(f"DELETE FROM UserBasic WHERE UserID = {UserID}")
    runQuery(f"DELETE FROM UserExtra WHERE UserID = {UserID}")
    runQuery(f"DELETE FROM UserProfile WHERE UserID = {UserID}")
    runQuery(f"DELETE FROM UserSchedule WHERE UserID = {UserID}")
    runQuery(f"DELETE FROM UserTransaction WHERE UserID = {UserID}")
    runQuery(f"DELETE FROM UserFavoriteMenuItems WHERE UserID = {UserID}")
    runQuery(f"DELETE FROM MenuItemsReviews WHERE UserID = {UserID}")
    # Add delete Dinning Review and Dinning Review

    return


# TODO: How to structure Auth routes?
@app.get("/{UserID}/Auth", response_model=UserOut)
async def return_auth(UserID: int = Depends(auth_handler.auth_wrapper)):
    # Fetch user using email
    user = [dict(row) for row in runQuery(
        f"SELECT * FROM UserBasic WHERE UserID = {UserID}")]

    if len(user) != 1:
        raise HTTPException(status_code=404, detail='User not found')

    user = user[0]

    res = UserOut.parse_obj(
        {'user_id': user['UserID'], 'name': user['Name'], 'email': user['Email']})

    return res


#Password Reset route
@app.post("/{UserID}/Auth")
async def update_auth(userBasic: UserBasic):

    # Fetch user using email
    user = [dict(row) for row in runQuery(
        f"SELECT * FROM UserBasic WHERE UserID = {userBasic.user_id}")]

    if len(user) != 1:
        raise HTTPException(status_code=404, detail='User not found')

    user = user[0]
    hashed_password = user['Password']

    if userBasic.password != "":
        hashed_password = auth_handler.get_password_hash(userBasic.password)

    runQuery(f"DELETE FROM UserBasic WHERE UserID = {userBasic.user_id}")

    runQuery(f"""
    INSERT INTO UserBasic values 
    ({userBasic.user_id}, '{userBasic.name}',
     '{user['Email']}', '{hashed_password}')
     """)


@app.get("/{UserID}/MealPlan", response_model=UserExtra)
async def fetch_meal_plan(UserID: int = Depends(auth_handler.auth_wrapper)):

    user_extra = [dict(row) for row in runQuery(
        f"SELECT * FROM UserExtra WHERE UserID = {UserID}")]

    if len(user_extra) != 1:
        raise HTTPException(
            status_code=404, detail='Meal Plan for user not found')

    res = [UserExtra.parse_obj({'user_id': user_extra['UserID'], 'meal_plan_name':user_extra['MealPlanName'],
                                'meal_swipe_count':user_extra['MealSwipeCount'], 'dining_dollar_amount':user_extra['DiningDollarBalance']
                                })]

    return res[0]


@app.post("/{UserID}/MealPlan")
async def assign_meal_plan(mealPlanName: MealPlanIn, UserID: int = Depends(auth_handler.auth_wrapper)):

    mealPlanName = mealPlanName.MealPlanName
    runQuery(f"DELETE from UserExtra WHERE UserID = {UserID}")
    meal_plan = [dict(row) for row in runQuery(
        f"SELECT * FROM MealPlan WHERE MealPlanName = '{mealPlanName}'")]


    if len(meal_plan) != 1:
        raise HTTPException(status_code=404, detail='Meal Plan not found')

    meal_plan = meal_plan[0]
    """
  Needs hardcore update to change transaction history
  """
    transactions = [dict(row) for row in runQuery(
        f"SELECT TransactionAmount FROM UserTransaction WHERE UserID = {UserID}")]

    for trans in transactions:
        meal_plan['DiningDollars'] - trans['TransactionAmount']

    runQuery(f"""
    INSERT INTO UserExtra values (
    {UserID}, '{meal_plan['MealPlanName']}',
    {meal_plan['MealSwipes']}, {meal_plan['DiningDollars']}
    )
    """)

    return


@app.get("/{UserID}/ProfilePic", response_model=UserProfile)
async def get_user_profile_pic(UserID: int = Depends(auth_handler.auth_wrapper)):

    profile = [dict(row) for row in runQuery(
        f"SELECT * FROM UserProfile WHERE UserID = {UserID}")]

    if len(profile) != 1:
        raise HTTPException(
            status_code=404, detail='Profile picture not found')

    res = [UserProfile.parse_obj(
        {'user_id': profile['UserID'], 'profile_pic': profile['ProfilePicture']})]

    return res[0]


# post user's profile pic
@app.post("/{UserID}/ProfilePic", status_code=201)
async def upload_profile_pic(userProfile: UserProfile, UserID: int = Depends(auth_handler.auth_wrapper)):

    runQuery(f"DELETE FROM UserProfile WHERE UserID = {UserID}")
    runQuery(
        f"INSERT INTO UserProfile values ({userProfile.user_id}, {userProfile.profile_pic}")

    return


@app.get("/{UserID}/Schedule", response_model=UserSchedule)
async def get_user_schedule(UserID: int = Depends(auth_handler.auth_wrapper)):

    schedule = [dict(row) for row in runQuery(
        f"SELECT * FROM UserSchedule WHERE UserID = {UserID}")]

    if len(schedule) != 1:
        raise HTTPException(status_code=404, detail='Schedule not found')

    res = [UserSchedule.parse_obj(
        {'user_id': schedule['UserID'], 'schedule': schedule['Schedule']})]

    return res[0]


# post user's profile pic
@app.post("/{UserID}/Schedule", status_code=201)
async def upload_user_schedule(userSchedule: UserSchedule, UserID: int = Depends(auth_handler.auth_wrapper)):

    runQuery(f"DELETE FROM UserSchedule WHERE UserID = {UserID}")
    runQuery(f"""INSERT INTO UserSchedule values 
        ({userSchedule.user_id}, {userSchedule.schedule}""")

    return


@app.get("/{UserID}/Trans", response_model=List[UserTransaction])
async def fetch_transactions(userID: int = Depends(auth_handler.auth_wrapper)):

    transactions = [dict(row) for row in runQuery(
        f"SELECT * FROM UserTransation WHERE UserID = {userID} ORDER BY Timestamp")]
    res = [UserTransaction.parse_obj({'user_id': row['UserId'], 'transaction_amount':row['TransactionAmount'],
                                      'balance':row['Balance'], 'timestamp': row['Timestamp']}) for row in transactions]

    return res


@app.post("/{UserID}/Trans", status_code=201)
async def post_transaction(userTransation: UserTransaction, UserID: int = Depends(auth_handler.auth_wrapper)):

    user_extra = [dict(row) for row in runQuery(
        f"SELECT * FROM UserExtra WHERE UserID = {UserID}")]

    if len(user_extra) != 1:
        raise HTTPException(status_code=401, detail='Invalid user')

    balance = user_extra['dining_dollar_amount'] - \
        userTransation.transaction_amount
    runQuery(f"""
    INSERT INTO UserTransaction values ({userTransation.user_id}, {userTransation.transaction_amount},
    {balance}, {userTransation.timestamp}
    """)

    return
