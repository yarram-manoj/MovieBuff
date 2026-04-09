import * as React from 'react';
import { createMovieClient } from '@repo/api';

/**
 * Hook to get and cache movie client
 * Prevents recreating the client on every render
 * Automatically detects platform and loads correct API key
 */
export function useMovieClient() {
  return React.useMemo(() => {
    let apiKey = '';

    if (typeof process !== 'undefined') {
      // Next.js (web)
      apiKey =
        process.env.NEXT_PUBLIC_TMDB_API_KEY ||
        // Expo (native)
        process.env.EXPO_PUBLIC_TMDB_API_KEY ||
        '';
    }

    return createMovieClient(apiKey);
  }, []);
}
