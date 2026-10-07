from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    supabase_url: str = ""
    supabase_key: str = ""
    
    ai_provider: str = "gemini"
    openai_api_key: Optional[str] = None
    gemini_api_key: Optional[str] = None
    
    maps_api_key: Optional[str] = None
    weather_api_key: Optional[str] = None
    
    debug: bool = True
    environment: str = "development"
    frontend_url: str = "http://localhost:5173"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

settings = Settings()
