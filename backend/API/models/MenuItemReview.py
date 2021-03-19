from pydantic import BaseModel, Field
from datetime import datetime


# MenuItemReview Modelß
class MenuItemReview(BaseModel):
    user_id: int
    menu_item_id: int
    # 0 to 5 scale
    rating: int = Field(ge=1, le=5)
    timestamp: datetime
