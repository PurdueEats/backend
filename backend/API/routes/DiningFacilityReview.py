from typing import List
from fastapi import APIRouter, Depends, HTTPException
from backend.API.model.DiningFacilityReview import DiningFacilityReview
from backend.DB.Util import runQuery


app = APIRouter()


@app.post("/", status_code=201)
async def post_review(diningFacilityReview: DiningFacilityReview):

    dining_facility_review_id = [dict(row) for row in runQuery(
        "SELECT FARM_FINGERPRINT(GENERATE_UUID()) as DiningFacilityReviewID")]
    
