/**
 * Main Export File - Atomic Design Structure
 *
 * Structure:
 * - atoms: Basic building blocks (Button)
 * - molecules: Combinations of atoms (Rating, GenreTag)
 * - organisms: Complex combinations (MovieCard, MovieDetail)
 */

// Atoms
export { default as Button, type ButtonProps } from './atoms/Button';

// Molecules
export { default as Rating, type RatingProps } from './molecules/Rating';
export { default as GenreTag, type GenreTagProps } from './molecules/GenreTag';

// Organisms
export {
  default as MovieCard,
  type MovieCardProps,
} from './organisms/MovieCard';
export {
  default as MovieDetail,
  type MovieDetailProps,
} from './organisms/MovieDetail';

// Shared Icons, Types & Constants
export type { RatingProps, GenreTagProps } from './shared/types';
export { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, i18n } from './shared';
