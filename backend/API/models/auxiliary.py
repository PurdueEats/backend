from datetime import date
from pydantic import BaseModel


class FunFact(BaseModel):
    fact:   str
    date:   date
