from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """Application settings"""
    DATABASE_URL: str = "sqlite:///./credence.db"
    SECRET_KEY: str = "dev-secret-key-change-in-production"
    DEBUG: bool = True
    
    class Config:
        env_file = ".env"


settings = Settings()
