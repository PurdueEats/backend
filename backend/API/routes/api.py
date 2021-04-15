from fastapi import FastAPI, APIRouter
from backend.API.routes import (
    users, 
    dining, 
    menu, 
    auxiliary, 
    MenuItemReview,
    DiningFacilityReview
)

router = FastAPI()
router.include_router(users.app, tags=["Users"], prefix="/Users")
router.include_router(dining.app, tags=["Dining"], prefix="/DF")
router.include_router(DiningFacilityReview.app, tags=["Dining Facility Review"], prefix="/DFR")
router.include_router(menu.app, tags=["Menu"], prefix="/MenuItems")
router.include_router(auxiliary.app, tags=["Auxiliary"])
router.include_router(MenuItemReview.app, tags=["MenuItemReview"], prefix="/MenuItemReview")
