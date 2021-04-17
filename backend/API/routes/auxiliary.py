from typing import List
from datetime import date
from fastapi import APIRouter, HTTPException
from backend.DB.Util import runQuery
from backend.API.models.auxiliary import FunFact, WeeklyNutrition


app = APIRouter()


@app.get("/PFF", response_model=List[FunFact])
async def get_all_fun_facts():

    res = [dict(row) for row in runQuery("SELECT * FROM PurdueFunFact")]

    res = [FunFact.parse_obj({
        'fact': item['FunFact'],
        'date': item['Date']
    }) for item in res]


@app.get("/PFF/{date}", response_model=FunFact)
async def get_fun_fact(date: date):

    res = [dict(row) for row in runQuery(
        f"SELECT * FROM PurdueFunFact WHERE Date = '{date}'")]

    if len(res) == 0:
        raise HTTPException(status_code=404, detail='No Fun Fact for today :(')

    res = FunFact.parse_obj({
        'fact': res[0]['FunFact'],
        'date': res[0]['Date']
    })

    return res


@app.get("/WeeklyNutrition/{date}", response_model=WeeklyNutrition)
async def get_weekly_nutrition(date: date):

    res = [dict(row) for row in runQuery(
        f"SELECT * FROM WeeklyNutrition WHERE Date = '{date}'")]

    if len(res) == 0:
        raise HTTPException(status_code=404, detail='Nutrition Report not found')
    
    res = WeeklyNutrition.parse_obj({
        'calories':   res[0]['Calories'],
        'carbs':      res[0]['Carbs'],
        'fat':        res[0]['Fat'],
        'protein':    res[0]['Protein']
    })

    return res