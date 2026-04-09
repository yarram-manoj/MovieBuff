import * as React from 'react';
import { Movie } from '@repo/api';

export interface MovieCardProps {
  movie: Movie;
  onPress?: (movie: Movie) => void;
  isLoading?: boolean;
}

/**
 * MovieCard Organism
 * Complex component displaying movie information
 */
export { MovieCard } from './MovieCard.web';
export { MovieCard as default } from './MovieCard.web';
export type { MovieCardProps };
