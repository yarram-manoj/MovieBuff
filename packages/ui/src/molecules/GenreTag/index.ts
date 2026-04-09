import * as React from 'react';

export interface GenreTagProps {
  name: string;
  onClick?: () => void;
}

/**
 * GenreTag Molecule
 * Displays genre label
 */
export { GenreTag as default } from './GenreTag.web';
export type { GenreTagProps };
