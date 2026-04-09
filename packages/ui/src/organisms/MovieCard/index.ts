import { Movie } from '@repo/api';

export interface MovieCardProps {
  movie: Movie;
  onPress?: (movie: Movie) => void;
  isLoading?: boolean;
}

/**
 * MovieCard Organism
 * Default export for backward compatibility
 */
export { MovieCard } from './MovieCard.web';
