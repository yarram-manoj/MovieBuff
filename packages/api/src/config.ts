/**
 * API Configuration
 * Loads from environment variables with fallback to defaults
 */

export interface ApiConfig {
  baseUrl: string;
  imageBaseUrl: string;
  apiKey: string;
}

/**
 * Get environment variable with platform-specific prefixes
 * Checks both Next.js (NEXT_PUBLIC_) and Expo (EXPO_PUBLIC_)
 */
function getEnvVar(key: string): string {
  if (typeof process === 'undefined') return '';
  
  const nextPubKey = `NEXT_PUBLIC_${key}`;
  const expoPubKey = `EXPO_PUBLIC_${key}`;
  
  return process.env[nextPubKey] || process.env[expoPubKey] || '';
}

/**
 * Load and validate API configuration
 */
export function loadApiConfig(): ApiConfig {
  const config: ApiConfig = {
    apiKey: getEnvVar('TMDB_API_KEY'),
    baseUrl: getEnvVar('TMDB_API_BASE_URL') || 'https://api.themoviedb.org/3',
    imageBaseUrl: getEnvVar('TMDB_IMAGE_BASE_URL') || 'https://image.tmdb.org/t/p',
  };

  if (!config.apiKey) {
    console.warn(
      'Warning: TMDB API key not found. Set NEXT_PUBLIC_TMDB_API_KEY (web) or EXPO_PUBLIC_TMDB_API_KEY (native) in .env.local'
    );
  }

  return config;
}
