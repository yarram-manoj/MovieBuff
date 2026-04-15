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

// ===== FOUNDATION TOKENS =====
export const DESIGN_TOKENS = {
  color: {
    brand: {
      50: '#eef2ff',
      100: '#e0e7ff',
      500: '#667eea',
      600: '#5568d3',
      700: '#4c51bf',
      800: '#3f45a6',
    },
    accent: {
      500: '#FFB800',
      600: '#FF9500',
    },
    neutral: {
      0: '#ffffff',
      50: '#f8f9fa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#1f2937',
    },
    semantic: {
      success: '#16a34a',
      warning: '#f59e0b',
      error: '#d32f2f',
      info: '#2563eb',
    },
  },
  spacing: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    12: 48,
  },
  radius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 999,
  },
  typography: {
    size: {
      xs: 12,
      sm: 13,
      base: 14,
      md: 15,
      lg: 16,
      xl: 18,
      '2xl': 24,
      '3xl': 32,
      '4xl': 48,
    },
    weight: {
      regular: '400' as const,
      medium: '500' as const,
      semibold: '600' as const,
      bold: '700' as const,
      extrabold: '800' as const,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  shadow: {
    sm: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.12,
      shadowRadius: 6,
      elevation: 4,
    },
  },
} as const;

// ===== THEMES =====
export const LIGHT_THEME = {
  isDark: false,
  colors: {
    background: {
      primary: DESIGN_TOKENS.color.neutral[0],
      secondary: DESIGN_TOKENS.color.neutral[50],
      tertiary: DESIGN_TOKENS.color.neutral[100],
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#666666',
      tertiary: '#999999',
      inverse: DESIGN_TOKENS.color.neutral[0],
    },
    brand: {
      primary: DESIGN_TOKENS.color.brand[500],
      primaryHover: DESIGN_TOKENS.color.brand[600],
      primaryDark: DESIGN_TOKENS.color.brand[700],
    },
    border: {
      subtle: '#f0f0f0',
      default: '#dddddd',
      strong: '#cccccc',
    },
    semantic: {
      success: DESIGN_TOKENS.color.semantic.success,
      warning: DESIGN_TOKENS.color.semantic.warning,
      error: DESIGN_TOKENS.color.semantic.error,
      info: DESIGN_TOKENS.color.semantic.info,
      rating: DESIGN_TOKENS.color.accent[500],
    },
    overlay: {
      light: 'rgba(255, 255, 255, 0.2)',
      dark: 'rgba(0, 0, 0, 0.5)',
    },
  },
} as const;

export const DARK_THEME = {
  isDark: true,
  colors: {
    background: {
      primary: '#0f0f1e',
      secondary: '#17172b',
      tertiary: '#1f1f38',
    },
    text: {
      primary: '#f5f7ff',
      secondary: '#c7cbe0',
      tertiary: '#9ca3bf',
      inverse: '#111111',
    },
    brand: {
      primary: '#8297f0',
      primaryHover: '#96a9f4',
      primaryDark: '#667eea',
    },
    border: {
      subtle: '#2a2a44',
      default: '#35355a',
      strong: '#484878',
    },
    semantic: {
      success: '#34d399',
      warning: '#fbbf24',
      error: '#f87171',
      info: '#60a5fa',
      rating: '#fbbf24',
    },
    overlay: {
      light: 'rgba(255, 255, 255, 0.14)',
      dark: 'rgba(0, 0, 0, 0.6)',
    },
  },
} as const;

// ===== BACKWARD-COMPATIBLE ALIASES =====
export const COLORS = {
  PRIMARY: LIGHT_THEME.colors.brand.primary,
  PRIMARY_DARK: LIGHT_THEME.colors.brand.primaryDark,
  SECONDARY: LIGHT_THEME.colors.background.tertiary,
  TEXT_PRIMARY: LIGHT_THEME.colors.text.primary,
  TEXT_SECONDARY: LIGHT_THEME.colors.text.secondary,
  TEXT_TERTIARY: LIGHT_THEME.colors.text.tertiary,
  TEXT_LIGHT: LIGHT_THEME.colors.text.inverse,
  BG_LIGHT: LIGHT_THEME.colors.background.secondary,
  BG_DARK: DARK_THEME.colors.background.primary,
  BORDER: LIGHT_THEME.colors.border.default,
  RATING: LIGHT_THEME.colors.semantic.rating,
  SUCCESS: LIGHT_THEME.colors.semantic.success,
  WARNING: LIGHT_THEME.colors.semantic.warning,
  ERROR: LIGHT_THEME.colors.semantic.error,
  INFO: LIGHT_THEME.colors.semantic.info,
  ERROR_BORDER: '#ffb3b3',
  ERROR_SOFT_BG: 'rgba(255, 200, 200, 0.1)',
};

// ===== APP CONSTANTS =====
export const APP_CONSTANTS = {
  SPLASH_DELAY_MS: 2500,
} as const;

// ===== TYPOGRAPHY =====
export const TYPOGRAPHY = {
  // Font sizes
  FONT_SIZE: {
    XS: DESIGN_TOKENS.typography.size.xs,
    SM: DESIGN_TOKENS.typography.size.sm,
    BASE: DESIGN_TOKENS.typography.size.base,
    MD: DESIGN_TOKENS.typography.size.md,
    LG: DESIGN_TOKENS.typography.size.lg,
    XL: DESIGN_TOKENS.typography.size.xl,
    '2XL': DESIGN_TOKENS.typography.size['2xl'],
    '3XL': DESIGN_TOKENS.typography.size['3xl'],
    '4XL': DESIGN_TOKENS.typography.size['4xl'],
  },

  // Font weights
  FONT_WEIGHT: {
    REGULAR: DESIGN_TOKENS.typography.weight.regular,
    MEDIUM: DESIGN_TOKENS.typography.weight.medium,
    SEMIBOLD: DESIGN_TOKENS.typography.weight.semibold,
    BOLD: DESIGN_TOKENS.typography.weight.bold,
    EXTRABOLD: DESIGN_TOKENS.typography.weight.extrabold,
  },

  // Line heights
  LINE_HEIGHT: {
    TIGHT: 1.2,
    NORMAL: 1.5,
    RELAXED: 1.75,
  },
} as const;

// ===== SPACING =====
export const SPACING = {
  XS: DESIGN_TOKENS.spacing[1],
  SM: DESIGN_TOKENS.spacing[2],
  MD: DESIGN_TOKENS.spacing[3],
  LG: DESIGN_TOKENS.spacing[4],
  XL: DESIGN_TOKENS.spacing[6],
  '2XL': DESIGN_TOKENS.spacing[8],
  '3XL': DESIGN_TOKENS.spacing[10],
};

// ===== BORDER RADIUS =====
export const BORDER_RADIUS = {
  SM: DESIGN_TOKENS.radius.sm,
  MD: DESIGN_TOKENS.radius.md,
  LG: DESIGN_TOKENS.radius.lg,
  XL: DESIGN_TOKENS.radius.xl,
  FULL: DESIGN_TOKENS.radius.full,
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
    backgroundColor: COLORS.PRIMARY,
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
