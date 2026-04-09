import * as React from 'react';
import {
  StyleSheet,
  GestureResponderEvent,
  Text,
  Pressable,
} from 'react-native';
import {
  COMPONENT_STYLES,
  SPACING,
  BORDER_RADIUS,
  COLORS,
  TYPOGRAPHY,
} from '../../shared/constants';

export interface ButtonProps {
  text: string;
  onClick?: (event: GestureResponderEvent) => void;
}

/**
 * Button - Native (React Native)
 * Reusable button component for mobile
 */
const ButtonComponent = ({ text, onClick }: ButtonProps) => {
  return (
    <Pressable style={styles.button} onPress={onClick || (() => {})}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

ButtonComponent.displayName = 'Button';

export const Button = React.memo<ButtonProps>(ButtonComponent);

const styles = StyleSheet.create({
  button: {
    maxWidth: 200,
    borderRadius: BORDER_RADIUS.LG,
    paddingVertical: SPACING.MD,
    paddingHorizontal: SPACING.LG,
    backgroundColor: COMPONENT_STYLES.button.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: COLORS.TEXT_LIGHT,
    fontSize: COMPONENT_STYLES.button.fontSize,
    textAlign: 'center' as const,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.SEMIBOLD,
  },
});
