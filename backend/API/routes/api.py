from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from backend.API.routes import (
    users, 
    dining, 
    menu, 
    auxiliary, 
    MenuItemReview,
    DiningFacilityReview
)

router = FastAPI()

origins = [
    "http://localhost:8000",
    "http://localhost:8080",
]

router.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

router.include_router(users.app, tags=["Users"], prefix="/Users")
router.include_router(dining.app, tags=["Dining"], prefix="/DF")
router.include_router(DiningFacilityReview.app, tags=["Dining Facility Review"], prefix="/DFR")
router.include_router(menu.app, tags=["Menu"], prefix="/MenuItems")
router.include_router(auxiliary.app, tags=["Auxiliary"])
router.include_router(MenuItemReview.app, tags=["MenuItemReview"], prefix="/MenuItemReview")
