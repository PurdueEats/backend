from datetime import date
from pydantic import BaseModel


class FunFact(BaseModel):
    fact:   str
    date:   date


class WeeklyNutrition(BaseModel):
    calories:   int
    carbs:      int
    fat:        int
    protein:    int