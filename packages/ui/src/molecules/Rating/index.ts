import * as React from 'react';

export interface RatingProps {
  rating: number;
  votesCount?: number;
}

/**
 * Rating Molecule
 * Displays movie rating with stars
 */
export { Rating as default } from './Rating.web';
export type { RatingProps };
