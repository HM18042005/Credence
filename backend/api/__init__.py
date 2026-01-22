from fastapi import APIRouter
from .borrower import router as borrower_router
from .lender import router as lender_router

# API Gateway - consolidates all API routes
api_router = APIRouter(prefix="/api/v1")

# Register sub-routers
api_router.include_router(borrower_router)
api_router.include_router(lender_router)

__all__ = ["api_router"]
