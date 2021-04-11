from typing import List
from fastapi import APIRouter, Depends, HTTPException
from backend.API.model.DiningFacilityReview import DiningFacilityReview
from backend.DB.Util import runQuery


app = APIRouter()


@app.post("/", status_code=201)
async def post_review(diningFacilityReview: DiningFacilityReview):

    dining_facility_review_id = [dict(row) for row in runQuery(
        "SELECT FARM_FINGERPRINT(GENERATE_UUID()) as DiningFacilityReviewID")]
    
    review_text = diningFacilityReview.title + '\n' + diningFacilityReview.review_text
    
    runQuery(f"""
        INSERT INTO DiningFacilityReview values (
        {dining_facility_review_id},
        {diningFacilityReview.user_id},
        {diningFacilityReview.dining_facility_id},
        {review_text},
        {diningFacilityReview.rating},
        {diningFacilityReview.upvote_count},
        {diningFacilityReview.downvote_count}
        )""")
    
    return


@app.get("/", response_model=List[DiningFacilityReview])
async def get_reviews(diningFacilityID: int):

    return []

    
