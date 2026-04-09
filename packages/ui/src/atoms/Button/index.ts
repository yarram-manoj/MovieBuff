import React from 'react';

export interface ButtonProps {
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Button - Platform-agnostic export
 * Default export for backward compatibility
 */
export { Button } from './Button.web';
