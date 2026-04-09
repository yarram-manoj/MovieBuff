/**
 * Native Exports - React Native
 * Platform-specific exports for React Native applications
 */

export { Button, type ButtonProps } from './atoms/Button/Button.native';
export {
  WatchlistButton,
  type WatchlistButtonProps,
} from './atoms/WatchlistButton/WatchlistButton.native';
export { Rating, type RatingProps } from './molecules/Rating/Rating.native';
export {
  GenreTag,
  type GenreTagProps,
} from './molecules/GenreTag/GenreTag.native';
export {
  MovieCard,
  type MovieCardProps,
} from './organisms/MovieCard/MovieCard.native';
export {
  MovieDetail,
  type MovieDetailProps,
} from './organisms/MovieDetail/MovieDetail.native';
export {
  WatchlistScreen,
  type WatchlistScreenProps,
} from './organisms/WatchlistScreen/WatchlistScreen.native';
export { i18n, getLocale, type Locale } from './shared/i18n';
export { ICONS, ASSET_PATHS, getIcon, type IconName } from './shared/assets';
