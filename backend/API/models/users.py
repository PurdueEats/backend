from datetime import datetime
from pydantic import BaseModel, EmailStr


class UserOut(BaseModel):
    user_id:    int
    name:       str
    email:      EmailStr


class UserBasic(BaseModel):
    user_id:    int
    name:       str
    email:      EmailStr
    password:   str


class UserExtra(BaseModel):
    user_id:                int
    meal_plan_name:         str
    meal_swipe_count:       int
    dining_dollar_amount:   float


class UserTransaction(BaseModel):
    user_id:            int
    transaction_amount: float
    balance:            float
    timestamp:          datetime


class UserProfile(BaseModel):
    user_id:        int
    profile_pic:    bytes


class UserSchedule(BaseModel):
    user_id:    int
    schedule:   bytes


class UserFavMenuItems(BaseModel):
    user_id:        int
    menu_item_id:   int
    toggle:         bool


class UserNutrition(BaseModel):
    user_id:    int
    calories:   int
    carbs:      int
    fat:        int
    protein:    int


class UserFavMeals(BaseModel):
    user_id:    int
    meal_id:    int
    name:       str
    toggle:     bool


class UserFeedbackIn(BaseModel):
    user_id:        int
    feedback_text:  str
    timestamp:      datetime


class UserFeedbackOut(BaseModel):
    user_id:        str
    name:           str
    email:          EmailStr
    feedback_text:  str
    timestamp:      datetime
