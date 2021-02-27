from pydantic import BaseModel
from datetime import datetime

class UserTransaction(BaseModel):
  user_id: int
  transaction_amount: float
  balance: float
  timestamp: datetime
