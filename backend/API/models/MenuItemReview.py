from datetime import datetime
from pydantic import BaseModel, Field


class MenuItemReview(BaseModel):
  user_id: int
  menu_item_id: int
  # 0 to 5 scale
  rating: int = Field(ge=0, le=5)
  timestamp: datetime
