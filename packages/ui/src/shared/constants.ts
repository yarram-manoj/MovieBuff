/**
 * Shared Constants for UI Components
 */

// Cast display settings
export const CAST_DISPLAY_LIMIT = 6;

// Image sizes
export const IMAGE_SIZES = {
  POSTER_SMALL: 'w342' as const,
  POSTER_MEDIUM: 'w500' as const,
  POSTER_LARGE: 'w780' as const,
  BACKDROP_SMALL: 'w780' as const,
  BACKDROP_MEDIUM: 'w1280' as const,
  ORIGINAL: 'original' as const,
};

// Colors
export const COLORS = {
  PRIMARY: '#667eea',
  SECONDARY: '#f0f0f0',
  TEXT_PRIMARY: '#1a1a1a',
  TEXT_SECONDARY: '#666',
  TEXT_TERTIARY: '#999',
  BORDER: '#ddd',
  RATING: '#FFB800',
  SUCCESS: '#4CAF50',
  WARNING: '#FF9800',
  ERROR: '#FF6B6B',
  BG_LIGHT: '#f8f9fa',
  BG_DARK: '#0f0f1e',
};

// Rating thresholds
export const RATING_THRESHOLDS = {
  HIGH: 7,
  GOOD: 6,
};

// Popularity thresholds
export const POPULARITY_THRESHOLDS = {
  TRENDING: 50,
};
