/**
 * Get API key from environment
 * Supports both Next.js (NEXT_PUBLIC_*) and Expo (EXPO_PUBLIC_*) prefixes
 */
export function getApiKey(): string {
  if (typeof process === 'undefined') return '';
  
  return (
    process.env.NEXT_PUBLIC_TMDB_API_KEY ||
    process.env.EXPO_PUBLIC_TMDB_API_KEY ||
    ''
  );
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
