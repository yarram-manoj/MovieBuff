import React from 'react';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../shared/constants';

export interface BadgeProps {
  /**
   * The content to display in the badge
   */
  children: React.ReactNode;
  /**
   * The variant/style of the badge
   */
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
  /**
   * Size of the badge
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Optional className for additional styling
   */
  className?: string;
}

// Shared color palette using design system constants
const colors = {
  primary: { bg: COLORS.PRIMARY, text: COLORS.TEXT_LIGHT },
  secondary: { bg: COLORS.SECONDARY, text: COLORS.TEXT_PRIMARY },
  success: { bg: COLORS.SUCCESS, text: COLORS.TEXT_LIGHT },
  error: { bg: COLORS.ERROR, text: COLORS.TEXT_LIGHT },
  warning: { bg: COLORS.WARNING, text: COLORS.TEXT_PRIMARY },
};

const sizes = {
  sm: { padding: SPACING.XS, fontSize: TYPOGRAPHY.FONT_SIZE.XS },
  md: { padding: SPACING.SM, fontSize: TYPOGRAPHY.FONT_SIZE.SM },
  lg: { padding: SPACING.MD, fontSize: TYPOGRAPHY.FONT_SIZE.BASE },
};

/**
 * Badge component for web
 * Displays a small label with customizable styling
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  const colors_variant = colors[variant];
  const sizes_variant = sizes[size];

  return (
    <span
      className={`inline-flex items-center justify-center font-semibold rounded ${className}`}
      style={{
        backgroundColor: colors_variant.bg,
        color: colors_variant.text,
        padding: `${sizes_variant.padding}px ${sizes_variant.padding * 2}px`,
        fontSize: `${sizes_variant.fontSize}px`,
        borderRadius: size === 'lg' ? `${BORDER_RADIUS.LG}px` : `${BORDER_RADIUS.SM}px`,
      }}
    >
      {children}
    </span>
  );
};
