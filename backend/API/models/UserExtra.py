from pydantic import BaseModel

class UserExtra(BaseModel):
  user_id: int
  meal_plan_name: str
  meal_swipe_count: int
  dining_dollar_amount: float
