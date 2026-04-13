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
 * In Next.js, NEXT_PUBLIC_* variables are inlined at build time
 * In React Native, use EXPO_PUBLIC_* variables
 */
function getEnvVar(key: string): string {
  // Try to get the value - it will be inlined by the bundler if available
  const nextPubKey = `NEXT_PUBLIC_${key}`;
  const expoPubKey = `EXPO_PUBLIC_${key}`;

  // In any environment, these could be available via process.env
  // They'll be strings if provided, undefined if not
  try {
    if (process.env[nextPubKey]) {
      return process.env[nextPubKey] as string;
    }
    if (process.env[expoPubKey]) {
      return process.env[expoPubKey] as string;
    }
  } catch (e) {
    // Silently ignore if process.env is not available
  }

  return '';
}

/**
 * Load and validate API configuration
 */
export function loadApiConfig(): ApiConfig {
  const config: ApiConfig = {
    apiKey: getEnvVar('TMDB_API_KEY'),
    baseUrl: getEnvVar('TMDB_API_BASE_URL') || 'https://api.themoviedb.org/3',
    imageBaseUrl:
      getEnvVar('TMDB_IMAGE_BASE_URL') || 'https://image.tmdb.org/t/p',
  };

  if (!config.apiKey) {
    console.warn(
      'Warning: TMDB API key not found. Set NEXT_PUBLIC_TMDB_API_KEY (web) or EXPO_PUBLIC_TMDB_API_KEY (native) in .env.local'
    );
  }

  return config;
}
