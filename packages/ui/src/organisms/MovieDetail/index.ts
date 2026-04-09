import * as React from 'react';

export interface MovieDetailProps {
  movie: any;
  onBack?: () => void;
  isLoading?: boolean;
}

/**
 * MovieDetail Organism
 * Complex component displaying detailed movie information
 */
export { MovieDetail as default } from './MovieDetail.web';
export type { MovieDetailProps };
