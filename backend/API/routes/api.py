from fastapi import APIRouter

from API.routes import users, dining, menu, auxiliary, MenuItemReview

router = APIRouter()
router.include_router(users.app, tags=["Users"], prefix="/Users")
router.include_router(dining.app, tags=["Dining"], prefix="/DF")
router.include_router(menu.app, tags=["Menu"], prefix="/MenuItems")
router.include_router(auxiliary.app, tags=["Auxiliary"])
router.include_router(MenuItemReview.app, tags=["MenuItemReview"], prefix="/MenuItemReview")
