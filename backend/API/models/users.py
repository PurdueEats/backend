from pydantic import BaseModel, EmailStr

class UserIn(BaseModel):
  user_id: int
  name: str
  email: EmailStr
  password: str

class UserOut(BaseModel):
  user_id: int
  name: str
  email: EmailStr
