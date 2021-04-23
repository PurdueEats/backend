""" User routes module. Contains all user resource related routes"""
from random import choice
from string import ascii_uppercase
from typing import List
import numpy as np
from fastapi import APIRouter, Depends, HTTPException
from backend.API.routes.auth import AuthHandler
from backend.DB.Util import runQuery
from backend.DB.UserSummary import gen_stats
from backend.API.models.MealPlan import MealPlanIn
from backend.API.models.menu import MenuItem
from backend.API.models.users import (
    UserBasic,
    UserExtra,
    UserProfile,
    UserSchedule,
    UserTransaction,
    UserFavMenuItems,
    UserOut,
    UserNutrition,
    UserFavMeals,
    UserFeedbackIn,
    UserFeedbackOut,
)
from backend.GNN.MatrixFactorization import matrix_factorization
from backend.GNN.MatrixGen import generate_matrix


app = APIRouter()
auth_handler = AuthHandler()


@app.get("/", response_model=List[UserOut])
async def get_all_users():
    '''
    summary: Retrieve a list of all users.\n
    description: Retrieve a list of users.
    '''
    res = [dict(row) for row in runQuery("SELECT * FROM UserBasic")]
    res = [UserOut.parse_obj({'user_id': item['UserID'], 'name': item['Name'],
                              'email':item['Email']})
           for item in res]

    return res



@app.post("/Register", status_code=201)
async def create_user(userBasic: UserBasic):
    '''
    summary: Creates new user.\n
    description: Creates user. enter name, email, and password. 201: successful creation returns null. 422 validation error: 
    '''
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

    runQuery(f"""
    INSERT INTO UserNutrition values
    ({user_id[0]['UserID']}, 0, 0, 0, 0)
    """)

    return {'UserID': str(user_id[0]['UserID'])}


@app.post("/Login")
async def login_user(userBasic: UserBasic):
    'log in user with name, email, and pw credentials. successful login returns null.'
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

    return {'UserID': str(user['UserID']), 'token': token}


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
    runQuery(f"DELETE FROM UserNutrition WHERE UserID = {UserID}")
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


# Password Reset route
@app.post("/{UserID}/Auth", status_code=201)
async def update_auth(userBasic: UserBasic, UserID: int = Depends(auth_handler.auth_wrapper)):

    # Fetch user using email
    user = [dict(row) for row in runQuery(
        f"SELECT * FROM UserBasic WHERE UserID = {userBasic.user_id}")]

    if len(user) != 1:
        raise HTTPException(status_code=404, detail='User not found')

    user = user[0]
    hashed_password = user['Password']
    userBasic.user_id = UserID

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

    user_extra = user_extra[0]
    res = [UserExtra.parse_obj({'user_id': user_extra['UserID'], 'meal_plan_name':user_extra['MealPlanName'],
                                'meal_swipe_count':user_extra['MealSwipeCount'], 'dining_dollar_amount':user_extra['DiningDollarBalance']
                                })]

    return res[0]


@app.post("/{UserID}/MealPlan", status_code=201)
async def assign_meal_plan(mealPlanName: MealPlanIn, UserID: int = Depends(auth_handler.auth_wrapper)):

    mealPlanName = mealPlanName.MealPlanName
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

    runQuery(f"DELETE from UserExtra WHERE UserID = {UserID}")

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

    profile = profile[0]
    res = [UserProfile.parse_obj(
        {'user_id': profile['UserID'], 'profile_pic': profile['ProfilePicture']})]

    return res[0]


# post user's profile pic
@app.post("/{UserID}/ProfilePic", status_code=201)
async def upload_profile_pic(userProfile: UserProfile, UserID: int = Depends(auth_handler.auth_wrapper)):

    runQuery(f"DELETE FROM UserProfile WHERE UserID = {UserID}")
    runQuery(
        f"INSERT INTO UserProfile values ({userProfile.user_id}, {userProfile.profile_pic})")

    return


@app.get("/{UserID}/Schedule", response_model=UserSchedule)
async def get_user_schedule(UserID: int = Depends(auth_handler.auth_wrapper)):

    schedule = [dict(row) for row in runQuery(
        f"SELECT * FROM UserSchedule WHERE UserID = {UserID}")]

    if len(schedule) != 1:
        raise HTTPException(status_code=404, detail='Schedule not found')

    schedule = schedule[0]
    res = [UserSchedule.parse_obj(
        {'user_id': schedule['UserID'], 'schedule': schedule['Schedule']})]

    return res[0]


# post user's profile pic
@app.post("/{UserID}/Schedule", status_code=201)
async def upload_user_schedule(userSchedule: UserSchedule, UserID: int = Depends(auth_handler.auth_wrapper)):

    runQuery(f"DELETE FROM UserSchedule WHERE UserID = {UserID}")
    runQuery(f"""INSERT INTO UserSchedule values 
        ({userSchedule.user_id}, {userSchedule.schedule})""")

    return


@app.get("/{UserID}/Trans", response_model=List[UserTransaction])
async def fetch_transactions(userID: int = Depends(auth_handler.auth_wrapper)):

    transactions = [dict(row) for row in runQuery(
        f"SELECT * FROM UserTransaction WHERE UserID = {userID} ORDER BY Timestamp")]
    
    res = [UserTransaction.parse_obj({'user_id': row['UserID'], 'transaction_amount':row['TransactionAmount'],
                                      'balance':row['Balance'], 'timestamp': row['Timestamp']}) for row in transactions]

    return res


@app.post("/{UserID}/Trans", status_code=201)
async def post_transaction(userTransaction: UserTransaction, UserID: int = Depends(auth_handler.auth_wrapper)):

    user_extra = [dict(row) for row in runQuery(
        f"SELECT * FROM UserExtra WHERE UserID = {UserID}")]

    if len(user_extra) != 1:
        raise HTTPException(status_code=401, detail='Invalid user')

    user_extra = user_extra[0]
    balance = user_extra['DiningDollarBalance'] - \
        userTransaction.transaction_amount

    runQuery(f"DELETE FROM UserExtra WHERE UserID = {UserID}")

    runQuery(f"""
    INSERT INTO UserExtra values (
        {UserID}, '{user_extra['MealPlanName']}',
        {user_extra['MealSwipeCount']}, {balance}
    )
    """)

    runQuery(f"""
    INSERT INTO UserTransaction values ({UserID}, {userTransaction.transaction_amount},
    {balance}, '{userTransaction.timestamp}')
    """)

    return


@app.post("/{UserID}/MealSwipe")
async def use_meal_swipe(UserID: int = Depends(auth_handler.auth_wrapper)):

    user_extra = [dict(row) for row in runQuery(
        f"SELECT * FROM UserExtra WHERE UserID = {UserID}")]

    if len(user_extra) != 1:
        raise HTTPException(status_code=401, detail='Invalid user')

    user_extra = user_extra[0]
    user_extra['MealSwipeCount'] -= 1

    runQuery(f"DELETE FROM UserExtra WHERE UserID = {UserID}")

    runQuery(f"""
    INSERT INTO UserExtra values (
        {user_extra['UserID']}, '{user_extra['MealPlanName']}',
        {user_extra['MealSwipeCount']}, {user_extra['DiningDollarBalance']}
    )
    """)

    return


@app.get("/{UserID}/Nutrition")
async def get_user_nutrition(UserID: int = Depends(auth_handler.auth_wrapper)):

    user_nutrition = [dict(row) for row in runQuery(
        f"SELECT * FROM UserNutrition WHERE UserID = {UserID}")]

    if len(user_nutrition) != 1:
        raise HTTPException(status_code=401, detail='Invalid user')

    user_nutrition = user_nutrition[0]

    res = UserNutrition.parse_obj({
        'user_id':  user_nutrition['UserID'],
        'calories': user_nutrition['Calories'],
        'carbs':    user_nutrition['Carbs'],
        'fat':      user_nutrition['Fat'],
        'protein':  user_nutrition['Protein']
    })

    return res


@app.get("/{UserID}/UserFavMeals", response_model=List[UserFavMeals])
async def get_user_fav_meals(UserID: int = Depends(auth_handler.auth_wrapper)):

    res = [dict(row) for row in runQuery(
        f"SELECT * FROM UserFavoriteMenuItems WHERE UserID = {UserID}")]

    res = [UserFavMeals.parse_obj({
        'user_id':  item['UserID'],
        'meal_id':  item['MenuItemID'],
        'name':   item['Name'],
        'toggle':   item['Toggle']
    })
        for item in res]

    return res


@app.post("/{UserID}/UserFavMeals", status_code=201)
async def post_user_fav_meals(userFavMeals: UserFavMeals, UserID: int = Depends(auth_handler.auth_wrapper)):

    userFavMeals.user_id = UserID

    res = [dict(row) for row in runQuery(
        f"SELECT COUNT(*) FROM MenuItems WHERE MenuItemID = {userFavMeals.meal_id}")]

    if res[0]['f0_'] != 1:
        raise HTTPException(
            status_code=401, detail='Invalid Menu Item')

    runQuery(f"""
    DELETE FROM UserFavoriteMenuItems 
    WHERE UserID = {userFavMeals.user_id} AND MenuItemID = {userFavMeals.meal_id}
    """)

    runQuery(f"""
    INSERT INTO UserFavoriteMenuItems values (
    {userFavMeals.user_id}, {userFavMeals.meal_id}, '{userFavMeals.name}', {userFavMeals.toggle}
    )
    """)


@app.delete("/{UserID}/UserFavMeals")
async def delete_user_fav_meals(menuItemID: int, UserID: int = Depends(auth_handler.auth_wrapper)):

    runQuery(f"""
    DELETE FROM UserFavoriteMenuItems 
    WHERE UserID = {UserID} AND MenuItemID = {menuItemID}
    """)

    return


@app.get("/Feedback", response_model=List[UserFeedbackOut])
async def get_feedback(UserID: int = Depends(auth_handler.auth_wrapper)):

    if UserID != 0:
        raise HTTPException(
            status_code=401, detail='User is not authorized for this task')

    res = [dict(row) for row in runQuery(
        f"""
        SELECT * FROM AppFeedback as A, UserBasic as U 
        WHERE A.UserID = U.UserID
        """)]

    res = [UserFeedbackOut.parse_obj({
        'user_id':          str(item['UserID']),
        'name':             item['Name'],
        'email':            item['Email'],
        'feedback_text':    item['FeedbackText'],
        'timestamp':        item['Timestamp']
    }) for item in res]

    return res


@app.post("/Feedback", status_code=201)
async def post_feedback(userFeedback: UserFeedbackIn, UserID: int = Depends(auth_handler.auth_wrapper)):

    userFeedback.feedback_text = userFeedback.feedback_text.replace('\n', '')

    runQuery(f"""
    INSERT INTO AppFeedback values (
        {UserID}, '{userFeedback.feedback_text}',
        '{userFeedback.timestamp}'
    )
    """)

    return


@app.get("/Predict", response_model=List[MenuItem])
async def predict(UserID: int = Depends(auth_handler.auth_wrapper)):

    
    R, user_map = generate_matrix()

    N = len(R)
    M = len(R[0])
    K = 3

    import random
    P = np.array([[random.random() for i in range(K)] for j in range(N)])
    Q = np.array([[random.random() for i in range(K)] for j in range(M)])

    nP, nQ = matrix_factorization(R, P, Q, K)

    nR = np.dot(nP, nQ.T)

    recommend_list = list(nR[user_map[str(UserID)]])
    recommend_list = [(x, i) for i,x in enumerate(recommend_list)]
    recommend_list.sort(reverse=True)
    recommend_list = recommend_list[:5]

    res = [dict(row) for row in runQuery(
        f"""SELECT * FROM MenuItems 
        WHERE 
        MenuItemID = {recommend_list[0][1]} OR
        MenuItemID = {recommend_list[1][1]} OR
        MenuItemID = {recommend_list[2][1]} OR
        MenuItemID = {recommend_list[3][1]} OR
        MenuItemID = {recommend_list[4][1]}""")]

    res = [MenuItem.parse_obj({
        'menu_item_id':   item['MenuItemID'],
        'hash_id':        item['HashID'],
        'item_name':      item['ItemName'],
        'has_eggs':       item['Eggs'],
        'has_fish':       item['Fish'],
        'has_gluten':     item['Gluten'],
        'has_milk':       item['Milk'],
        'has_peanuts':    item['Peanuts'],
        'has_shellfish':  item['Shellfish'],
        'has_soy':        item['Soy'],
        'has_treenuts':   item['TreeNuts'],
        'is_vegetarian':  item['Vegetarian'],
        'is_vegan':       item['Vegan'],
        'has_wheat':      item['Wheat']
    }) for item in res]

    return res


@app.get("/UserSummary")
async def get_user_summary(UserID: int = Depends(auth_handler.auth_wrapper)):

    return gen_stats(UserID)


@app.post("/ForgotPassword", status_code=201)
async def forgot_password(email: str):

    user = [dict(row) for row in runQuery(
        f"SELECT * FROM UserBasic WHERE Email = '{email}'")]

    if len(user) != 1:
        raise HTTPException(
            status_code=401, detail='Invalid username and/or password')

    user = user[0]
    new_password = ''.join(choice(ascii_uppercase) for _ in range(8))
    hashed_password = auth_handler.get_password_hash(new_password)
    user['Password'] = hashed_password

    runQuery(f"DELETE FROM UserBasic WHERE Email = '{email}'")

    runQuery(f"""
    INSERT INTO UserBasic values 
    ({user['UserID']}, '{user['Name']}',
     '{user['Email']}', '{user['Password']}')
     """)

    import requests

    r = requests.post(
        "https://api.mailgun.net/v3/sandbox459d6d8b3208457c8613631ae018378a.mailgun.org/messages",
        auth=("api", fetch_api_key()),
        data={"from": "Excited User <mailgun@sandbox459d6d8b3208457c8613631ae018378a.mailgun.org>",
                      "to": [email],
                      "subject": "Hello",
              "text": "Your new password is: " + new_password})

    print(r.text)

    return


def fetch_api_key():

    """
    from google.cloud import secretmanager_v1beta1 as secretmanager

    secret_id = 'MAILGUN_KEY'
    project_id = 'purdueeats-304919'
    version_id = 1    # use the management tools to determine version at runtime

    client = secretmanager.SecretManagerServiceClient()

    name = f"projects/{project_id}/secrets/{secret_id}/versions/{version_id}"

    response = client.access_secret_version(request={"name": name})
    payload = response.payload.data.decode("UTF-8")
    """
    import os

    return os.environ.get("API")
