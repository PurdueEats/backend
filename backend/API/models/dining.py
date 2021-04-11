from pydantic import BaseModel
from backend.API.models.menu import MenuItem


class DiningFacility(BaseModel):
    dining_facility_id:     int
    dining_facility_name:   str
    description:            str
    address:                str
    image:                  bytes


class DiningFacilityMenuItem(BaseModel):
    menu_item:  MenuItem
    timing:     str 
    station:    str
