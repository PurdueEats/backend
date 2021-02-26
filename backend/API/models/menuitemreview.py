from datetime import datetime
from pydantic import BaseModel


class MenuItemReview(BaseModel):
  user_id: int
  menu_item_id: int
  # 0 to 5 scale
  rating: int
  timestamp: datetime
