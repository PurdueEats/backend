from pydantic import BaseModel


class MealPlanIn(BaseModel):
  MealPlanName: str


class MealPlan(BaseModel):
  MealPlanName: str
  meal_swipes: int
  dining_dollars: float
