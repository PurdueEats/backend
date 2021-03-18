from fastapi import APIRouter
from API.models.dining import DiningFacility
from DB.Util import runQuery


app = APIRouter()


@app.get("/", response_model=DiningFacility)
async def get_dining_facilities():

    res = [dict(row) for row in runQuery("SELECT * FROM DiningFacility")]
    res = [DiningFacility.parse_obj({
        'dining_facility_id':     item['DiningFacilityID']
        'dining_facility_name':   item['DiningFacilityName']
        'description':            item['Description']
        'address':                item['DiningFacilityID']
        'image':                  item['DiningFacilityID']
    }) for item in res] 