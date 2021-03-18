from typing import List
from fastapi import APIRouter, HTTPException
from API.models.dining import DiningFacility
from DB.Util import runQuery


app = APIRouter()


@app.get("/", response_model=List[DiningFacility])
async def get_dining_facilities():

    res = [dict(row) for row in runQuery("SELECT * FROM DiningFacility")]
    res = [DiningFacility.parse_obj({
        'dining_facility_id':     item['DiningFacilityID'],
        'dining_facility_name':   item['DiningFacilityName'],
        'description':            item['Description'],
        'address':                item['DiningFacilityID'],
        'image':                  item['DiningFacilityID']
    }) for item in res]


    return res


@app.get("/{DiningFacilityID}", response_model=DiningFacility)
async def get_dining_facility(DiningFacilityID: int):

    res = [dict(row) for row in runQuery(f"SELECT * FROM DiningFacility WHERE DiningFacilityID = {DiningFacilityID}")]

    if len(res) != 1:
        raise HTTPException(status_code=400, detail='Dining Facility not found')
    

    res = [DiningFacility.parse_obj({
        'dining_facility_id':     item['DiningFacilityID'],
        'dining_facility_name':   item['DiningFacilityName'],
        'description':            item['Description'],
        'address':                item['DiningFacilityID'],
        'image':                  item['DiningFacilityID']
    }) for item in res]


    return res[0]