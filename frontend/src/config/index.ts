// Environment configuration and constants

export const config = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  environment: import.meta.env.VITE_ENVIRONMENT || 'development',
} as const;

export const APP_NAME = 'TourEase';
export const DEFAULT_CURRENCY = 'INR';
export const DEFAULT_LANGUAGE = 'en';
export const SUPPORTED_LANGUAGES = ['en', 'hi'] as const;

export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
} as const;
