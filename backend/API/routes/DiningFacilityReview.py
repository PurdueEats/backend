from typing import List
from fastapi import APIRouter, Depends, HTTPException
from backend.API.models.DiningFacilityReview import DiningFacilityReview
from backend.DB.Util import runQuery


app = APIRouter()


@app.post("/", status_code=201)
async def post_review(diningFacilityReview: DiningFacilityReview):

    if int(diningFacilityReview.dining_facility_id) > 5 or int(diningFacilityReview.dining_facility_id) < 0:
        raise HTTPException(
            status_code=404, detail='Dining Facility not found')

    user_id = [dict(row) for row in runQuery(
        f"SELECT COUNT(*) FROM UserBasic WHERE UserID = {int(diningFacilityReview.user_id)}")]

    if user_id[0]['f0_'] != 1:
        raise HTTPException(status_code=404, detail='Invalid User')

    dining_facility_review_id = [dict(row) for row in runQuery(
        "SELECT FARM_FINGERPRINT(GENERATE_UUID()) as DiningFacilityReviewID")][0]

    review_text = diningFacilityReview.title + \
        '$' + diningFacilityReview.review_text

    runQuery(f"""
        INSERT INTO DiningFacilityReview values (
        {dining_facility_review_id['DiningFacilityReviewID']},
        {int(diningFacilityReview.user_id)},
        {int(diningFacilityReview.dining_facility_id)},
        '{review_text}',
        {diningFacilityReview.rating},
        {diningFacilityReview.upvote_count},
        {diningFacilityReview.downvote_count}
        )""")

    return


@app.get("/", response_model=List[DiningFacilityReview])
async def get_reviews(diningFacilityID: int):

    if int(diningFacilityID) > 5 or int(diningFacilityID) < 0:
        raise HTTPException(
            status_code=404, detail='Dining Facility not found')

    res = [dict(row) for row in runQuery(
        f"SELECT * FROM DiningFacilityReview WHERE DiningFacilityID = {diningFacilityID}")]

    reviews = [DiningFacilityReview({
        'dining_facility_review_id':  item['DiningFacilityReviewID'],
        'user_id':                    item['UserID'],
        'dining_facility_id':         item['DiningFacilityID'],
        'title':                      item['Review'].split('$')[0],
        'review_text':                item['Review'].split('$')[1],
        'rating':                     item['Rating'],
        'upvote_count':               item['UpvoteCount'],
        'downvote_count':             item['DownvoteCount']
    }) for item in res]

    return reviews
