import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
   * Optional style for additional customization
   */
  style?: any;
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
 * Badge component for React Native
 * Displays a small label with customizable styling
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  style,
}) => {
  const colors_variant = colors[variant];
  const sizes_variant = sizes[size];

  const nativeStyles = StyleSheet.create({
    container: {
      backgroundColor: colors_variant.bg,
      paddingHorizontal: sizes_variant.padding * 2,
      paddingVertical: sizes_variant.padding,
      borderRadius: size === 'lg' ? BORDER_RADIUS.LG : BORDER_RADIUS.SM,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: colors_variant.text,
      fontSize: sizes_variant.fontSize,
      fontWeight: TYPOGRAPHY.FONT_WEIGHT.SEMIBOLD,
    },
  });

  return (
    <View style={[nativeStyles.container, style]}>
      <Text style={nativeStyles.text}>{children}</Text>
    </View>
  );
};
