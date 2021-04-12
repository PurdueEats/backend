from pydantic import BaseModel, Field


class DiningFacilityReviewIn(BaseModel):
    dining_facility_review_id:  str
    user_id:                    str
    dining_facility_id:         str
    title:                      str
    review_text:                str
    rating:                     int = Field(ge=1, le=5)


class DiningFacilityReviewOut(BaseModel):
    dining_facility_review_id:  str
    user_name:                  str
    dining_facility_id:         str
    title:                      str
    review_text:                str
    rating:                     int = Field(ge=1, le=5)
    upvote_count:               int
    downvote_count:             int


class VoteIn(BaseModel):
    dining_facility_review_id:  str
    user_id:                    str
    vote:                       int = Field(ge=-1, le=1)
