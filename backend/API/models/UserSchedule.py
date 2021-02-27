from pydantic import BaseModel

class UserSchedule(BaseModel):
  user_id: int
  schedule: str
