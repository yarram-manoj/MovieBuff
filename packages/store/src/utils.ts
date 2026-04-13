/**
 * Get API key from environment
 * Supports both Next.js (NEXT_PUBLIC_*) and Expo (EXPO_PUBLIC_*) prefixes
 * Throws if not configured to fail fast
 */
export function getApiKey(): string {
  if (typeof process === 'undefined') return '';

  const apiKey =
    process.env.NEXT_PUBLIC_TMDB_API_KEY ||
    process.env.EXPO_PUBLIC_TMDB_API_KEY;

  if (!apiKey) {
    throw new Error(
      'API key not configured. Set NEXT_PUBLIC_TMDB_API_KEY (web) or EXPO_PUBLIC_TMDB_API_KEY (native) in your environment variables.'
    );
  }

  return apiKey;
}

/**
 * Handle async thunk errors consistently
 */
export function handleThunkError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An error occurred';
}
