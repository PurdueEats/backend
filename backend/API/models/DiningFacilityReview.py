from pydantic import BaseModel, Field


class DiningFacilityReview(BaseModel):
    dining_facility_review_id:  str
    user_id:                    str
    dining_facility_id:         str
    title:                      str
    review_text:                str
    rating:                     int = Field(ge=1, le=5)
    upvote_count:               int
    downvote_count:             int
