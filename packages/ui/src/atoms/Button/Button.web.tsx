import * as React from 'react';

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
    borderRadius: '10px',
    padding: '14px 30px',
    fontSize: '15px',
    backgroundColor: '#2f80ed',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};
