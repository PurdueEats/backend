from fastapi import APIRouter

from backend.API.routes import users, dining, menu, aux

router = APIRouter()
router.include_router(users.router, tags=["Users"], prefix="/Users")
router.include_router(dining.router, tags=["Dining"], prefix="/DF")
router.include_router(menu.router, tags=["Menu"], prefix="/MenuItems")
router.include_router(aux.router, tags=["Auxiliary"])