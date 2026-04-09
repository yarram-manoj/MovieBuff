import { Movie } from '@repo/api';

export interface MovieDetailProps {
  movie: Movie;
  onBack?: () => void;
  isLoading?: boolean;
}

/**
 * MovieDetail Organism
 * Default export for backward compatibility
 */
export { MovieDetail } from './MovieDetail.web';
