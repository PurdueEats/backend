from typing import List
from fastapi import APIRouter, Depends, HTTPException
from backend.API.models.DiningFacilityReview import (
    DiningFacilityReviewIn,
    DiningFacilityReviewOut,
    VoteIn
)
from backend.DB.Util import runQuery


app = APIRouter()


@app.post("/", status_code=201)
async def post_review(diningFacilityReview: DiningFacilityReviewIn):

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
        0,0
        )""")

    return


@app.get("/", response_model=List[DiningFacilityReviewOut])
async def get_reviews(diningFacilityID: int):

    if diningFacilityID > 5 or diningFacilityID < 0:
        raise HTTPException(
            status_code=404, detail='Dining Facility not found')

    res = [dict(row) for row in runQuery(
        f"""
        SELECT * 
        FROM DiningFacilityReview as D, UserBasic as U
         WHERE D.DiningFacilityID = {diningFacilityID} AND
         D.UserID = U.UserID""")]

    reviews = [DiningFacilityReviewOut.parse_obj({
        'dining_facility_review_id':  item['DiningFacilityReviewID'],
        'user_name':                  item['Name'],
        'dining_facility_id':         item['DiningFacilityID'],
        'title':                      item['Review'].split('$')[0],
        'review_text':                item['Review'].split('$')[1],
        'rating':                     item['Rating'],
        'upvote_count':               item['UpvoteCount'],
        'downvote_count':             item['DownvoteCount']
    }) for item in res]

    return reviews


@app.post("/Vote")
async def update_vote(vote: VoteIn):

    review = [dict(row) for row in runQuery(
        f"""SELECT * FROM DiningFacilityReview 
        WHERE DiningFacilityID = {int(vote.dining_facility_review_id)}""")]
    
    if len(review) != 1:
        raise HTTPException(
            status_code=404, detail='Facility Review not found')
    
    user_id = [dict(row) for row in runQuery(
        f"SELECT COUNT(*) FROM UserBasic WHERE UserID = {int(vote.user_id)}")]

    if user_id[0]['f0_'] != 1:
        raise HTTPException(status_code=404, detail='Invalid User')
    
    review = review[0]
    if review['UserID'] == int(vote.user_id):
        raise HTTPException(
            status_code=400, detail='User cannot vote their own review!')
