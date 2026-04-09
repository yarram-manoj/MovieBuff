/**
 * Shared SVG Assets
 * Platform-agnostic icon and image assets for both web and mobile
 *
 * Usage:
 * Web: <img src={ICONS.star} alt="star" />
 * Native: <Image source={{ uri: ICONS.star }} />
 * Or use require() for bundled assets
 */

// Export asset paths for reference
export const ICONS = {
  star: require('./star.svg'),
  heart: require('./heart.svg'),
  heartOutline: require('./heart-outline.svg'),
  search: require('./search.svg'),
  film: require('./film.svg'),
  play: require('./play.svg'),
  arrowLeft: require('./arrow-left.svg'),
  xClose: require('./x-close.svg'),
  loader: require('./loader.svg'),
  eye: require('./eye.svg'),
  calendar: require('./calendar.svg'),
} as const;

export type IconName = keyof typeof ICONS;

/**
 * Get icon by name
 * @param name - Icon name from ICONS
 * @returns Icon asset/path
 */
export const getIcon = (name: IconName): (typeof ICONS)[IconName] => {
  return ICONS[name];
};

/**
 * Asset path utility
 * Provides a consistent way to reference SVG assets
 */
export const ASSET_PATHS = {
  icons: {
    star: './star.svg',
    heart: './heart.svg',
    heartOutline: './heart-outline.svg',
    search: './search.svg',
    film: './film.svg',
    play: './play.svg',
    arrowLeft: './arrow-left.svg',
    xClose: './x-close.svg',
    loader: './loader.svg',
    eye: './eye.svg',
    calendar: './calendar.svg',
  },
} as const;
