from pydantic import BaseModel
from typing import Optional

class UserFavMeal(BaseModel):
  user_id: int
  menu_item_id: int
  toggle: bool
