from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings

app = FastAPI(
    title="TourEase API",
    description="Backend API for TourEase travel assistant",
    version="0.1.0"
)

# Configure CORS
origins = [
    settings.frontend_url,
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "environment": settings.environment}

@app.get("/")
async def root():
    return {"message": "Welcome to TourEase API"}
