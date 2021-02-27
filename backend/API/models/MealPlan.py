from pydantic import BaseModel

class MealPlan(BaseModel):
  MealPlanName: str
  meal_swipes: int
  dining_dollars: float
