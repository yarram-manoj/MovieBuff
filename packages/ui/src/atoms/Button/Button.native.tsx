import * as React from 'react';
import {
  StyleSheet,
  GestureResponderEvent,
  Text,
  Pressable,
} from 'react-native';

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
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 30,
    backgroundColor: '#2f80ed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
});
