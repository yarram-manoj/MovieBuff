/**
 * Web Exports - Next.js
 * Platform-specific exports for web applications
 */

export { Button, type ButtonProps } from './atoms/index.web';
export {
  WatchlistButton,
  type WatchlistButtonProps,
} from './atoms/WatchlistButton/WatchlistButton.web';
export {
  FeaturedMovie,
  type FeaturedMovieProps,
  Rating,
  type RatingProps,
  GenreTag,
  type GenreTagProps,
} from './molecules/index.web';
export {
  MovieCard,
  type MovieCardProps,
  MovieDetail,
  type MovieDetailProps,
  WatchlistScreen,
  type WatchlistScreenProps,
} from './organisms/index.web';
export { i18n, getLocale, type Locale } from './shared/i18n';
export { ICONS, ASSET_PATHS, getIcon, type IconName } from './shared/assets';
