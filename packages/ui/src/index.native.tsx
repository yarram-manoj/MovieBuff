/**
 * Native Exports - React Native
 * Platform-specific exports for React Native applications
 */

export { Button, type ButtonProps } from './atoms/index.native';
export {
  WatchlistButton,
  type WatchlistButtonProps,
} from './atoms/WatchlistButton/WatchlistButton.native';
export {
  FeaturedMovie,
  type FeaturedMovieProps,
  Rating,
  type RatingProps,
  GenreTag,
  type GenreTagProps,
} from './molecules/index.native';
export {
  MovieCard,
  type MovieCardProps,
  MovieDetail,
  type MovieDetailProps,
  WatchlistScreen,
  type WatchlistScreenProps,
} from './organisms/index.native';
export { i18n, getLocale, type Locale } from './shared/i18n';
export { ICONS, ASSET_PATHS, getIcon, type IconName } from './shared/assets';
