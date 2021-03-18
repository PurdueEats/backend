from pydantic import BaseModel


class DiningFacility(BaseModel):
    dining_facility_id:     int
    dining_facility_name:   str
    description:            str
    address:                str
    image:                  bytes
