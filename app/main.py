from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import init_db
from app.api.endpoints import router

# Create FastAPI app
app = FastAPI(
    title="Credence - MSME Creditworthiness Engine",
    description="Production-style MSME creditworthiness engine inspired by India's Account Aggregator ecosystem",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files and templates
app.mount("/static", StaticFiles(directory="app/static"), name="static")
templates = Jinja2Templates(directory="app/templates")

# Include API router
app.include_router(router, prefix="/api/v1", tags=["API"])


@app.on_event("startup")
def on_startup():
    """Initialize database on startup"""
    init_db()


@app.get("/")
def read_root(request: Request):
    """Serve the dashboard"""
    return templates.TemplateResponse("dashboard.html", {"request": request})


@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "Credence MSME Creditworthiness Engine"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
