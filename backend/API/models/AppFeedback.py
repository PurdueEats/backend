from pydantic import BaseModel
from datetime import datetime

class Feedback(BaseModel):
  user_id: int
  feedback_text: str
  timestamp: datetime
