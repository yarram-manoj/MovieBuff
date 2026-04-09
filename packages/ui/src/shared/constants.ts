/**
 * Shared Design System Constants for UI Components
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

// ===== COLORS =====
export const COLORS = {
  // Primary
  PRIMARY: '#667eea',
  PRIMARY_DARK: '#2f80ed',

  // Secondary
  SECONDARY: '#f0f0f0',

  // Text
  TEXT_PRIMARY: '#1a1a1a',
  TEXT_SECONDARY: '#666',
  TEXT_TERTIARY: '#999',
  TEXT_LIGHT: '#white',

  // Background
  BG_LIGHT: '#f8f9fa',
  BG_DARK: '#0f0f1e',

  // Semantic
  BORDER: '#ddd',
  RATING: '#FFB800',
  SUCCESS: '#4CAF50',
  WARNING: '#FF9800',
  ERROR: '#FF6B6B',
};

// ===== TYPOGRAPHY =====
export const TYPOGRAPHY = {
  // Font sizes
  FONT_SIZE: {
    XS: 12,
    SM: 13,
    BASE: 14,
    MD: 15,
    LG: 16,
    XL: 18,
    '2XL': 24,
  },

  // Font weights
  FONT_WEIGHT: {
    REGULAR: '400' as const,
    MEDIUM: '500' as const,
    SEMIBOLD: '600' as const,
    BOLD: '700' as const,
  },

  // Line heights
  LINE_HEIGHT: {
    TIGHT: 1.2,
    NORMAL: 1.5,
    RELAXED: 1.75,
  },
};

// ===== SPACING =====
export const SPACING = {
  XS: 4,
  SM: 8,
  MD: 12,
  LG: 16,
  XL: 24,
  '2XL': 32,
};

// ===== BORDER RADIUS =====
export const BORDER_RADIUS = {
  SM: 4,
  MD: 8,
  LG: 12,
  XL: 16,
  FULL: 999,
};

// ===== COMPONENT STYLES =====
export const COMPONENT_STYLES = {
  button: {
    padding: `${SPACING.MD}px ${SPACING.LG}px`,
    paddingVertical: SPACING.MD,
    paddingHorizontal: SPACING.LG,
    fontSize: TYPOGRAPHY.FONT_SIZE.MD,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.SEMIBOLD,
    borderRadius: BORDER_RADIUS.LG,
    backgroundColor: COLORS.PRIMARY_DARK,
    color: COLORS.TEXT_LIGHT,
    border: 'none',
  },

  tag: {
    padding: `${SPACING.SM}px ${SPACING.MD}px`,
    paddingVertical: SPACING.SM,
    paddingHorizontal: SPACING.MD,
    fontSize: TYPOGRAPHY.FONT_SIZE.SM,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.SEMIBOLD,
    borderRadius: BORDER_RADIUS.FULL,
    backgroundColor: COLORS.SECONDARY,
    color: COLORS.TEXT_SECONDARY,
    border: `1px solid ${COLORS.BORDER}`,
  },

  rating: {
    fontSize: TYPOGRAPHY.FONT_SIZE.XL,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.SEMIBOLD,
    color: COLORS.RATING,
  },

  ratingVotes: {
    fontSize: TYPOGRAPHY.FONT_SIZE.BASE,
    color: COLORS.TEXT_SECONDARY,
  },
};

// ===== RATING THRESHOLDS =====
export const RATING_THRESHOLDS = {
  HIGH: 7,
  GOOD: 6,
};

// ===== POPULARITY THRESHOLDS =====
export const POPULARITY_THRESHOLDS = {
  TRENDING: 50,
};
