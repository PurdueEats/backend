from pydantic import BaseModel

class MealPlan(BaseModel):
  meal_plan_name: str
  meal_swipes: int
  dining_dollars: float
    
