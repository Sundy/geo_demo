from fastapi import APIRouter

router = APIRouter()

# Include sub-routers here
# Example:
# from app.routers.auth import router as auth_router
# from app.routers.intent import router as intent_router
# router.include_router(auth_router, prefix="/auth", tags=["auth"])
# router.include_router(intent_router, prefix="/intents", tags=["intents"])


@router.get("/")
async def api_root():
    """API root endpoint."""
    return {"message": "AceFlow GEO API v1"}
