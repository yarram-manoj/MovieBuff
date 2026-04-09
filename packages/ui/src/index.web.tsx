/**
 * Web Exports - Next.js
 * Platform-specific exports for web applications
 */

export { Button, type ButtonProps } from './atoms/Button/Button.web';
export {
  WatchlistButton,
  type WatchlistButtonProps,
} from './atoms/WatchlistButton/WatchlistButton.web';
export { Rating, type RatingProps } from './molecules/Rating/Rating.web';
export {
  GenreTag,
  type GenreTagProps,
} from './molecules/GenreTag/GenreTag.web';
export {
  MovieCard,
  type MovieCardProps,
} from './organisms/MovieCard/MovieCard.web';
export {
  MovieDetail,
  type MovieDetailProps,
} from './organisms/MovieDetail/MovieDetail.web';
export {
  WatchlistScreen,
  type WatchlistScreenProps,
} from './organisms/WatchlistScreen/WatchlistScreen.web';
export { i18n, getLocale, type Locale } from './shared/i18n';
export { ICONS, ASSET_PATHS, getIcon, type IconName } from './shared/assets';
