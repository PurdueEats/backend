from pydantic import BaseModel

class MealRating(BaseModel):
  meal_name: str
  meal_id: int
  # 0 to 5 scale
  rating: int
