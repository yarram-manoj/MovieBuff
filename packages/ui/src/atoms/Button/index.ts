import * as React from 'react';

export interface ButtonProps {
  text: string;
  onClick?: (event: any) => void;
}

/**
 * Button - Native implementation
 * Basic button component for React Native
 */
export { Button as default } from './Button.native';
export type { ButtonProps };
