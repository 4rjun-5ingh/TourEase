from supabase import create_client, Client
from app.config import settings

_supabase_client: Client | None = None

def get_supabase() -> Client:
    """Return the Supabase client singleton."""
    global _supabase_client
    if _supabase_client is None:
        if not settings.supabase_url or not settings.supabase_key:
            raise RuntimeError(
                "Supabase URL and Key must be set in environment variables. "
                "See .env.example for required values."
            )
        _supabase_client = create_client(settings.supabase_url, settings.supabase_key)
    return _supabase_client
