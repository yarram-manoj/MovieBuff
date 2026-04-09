import * as React from 'react';
import {
  COMPONENT_STYLES,
  SPACING,
  BORDER_RADIUS,
} from '../../shared/constants';

export interface ButtonProps {
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Button - Web (Next.js)
 * Reusable button component for web
 */
export function Button({ text, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} style={styles.button}>
      {text}
    </button>
  );
}

const styles = {
  button: {
    maxWidth: '200px',
    textAlign: 'center' as const,
    borderRadius: `${BORDER_RADIUS.LG}px`,
    padding: `${SPACING.MD}px ${SPACING.LG}px`,
    fontSize: `${COMPONENT_STYLES.button.fontSize}px`,
    backgroundColor: COMPONENT_STYLES.button.backgroundColor,
    color: COMPONENT_STYLES.button.color,
    border: COMPONENT_STYLES.button.border,
    cursor: 'pointer',
  },
};
