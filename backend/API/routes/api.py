from fastapi import APIRouter

from API.routes import users, dining, menu, aux, MenuItemReview

router = APIRouter()
router.include_router(users.router, tags=["Users"], prefix="/Users")
router.include_router(dining.router, tags=["Dining"], prefix="/DF")
router.include_router(menu.router, tags=["Menu"], prefix="/MenuItems")
router.include_router(aux.router, tags=["Auxiliary"])
router.include_roouter(aux.router, tags=["MenuItemReview"], prefix="/MenuItemReview")
