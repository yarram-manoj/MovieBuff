/**
 * Localization/i18n Configuration
 * Centralized text strings for all UI components and screens
 */

export type Locale = 'en';

interface Translations {
  // App
  app: {
    title: string;
    subtitle: string;
  };

  // Navigation & Tabs
  navigation: {
    browse: string;
    watchlist: string;
    myWatchlist: string;
  };

  // Categories
  categories: {
    popular: string;
    nowPlaying: string;
    upcoming: string;
    topRated: string;
  };

  // Search
  search: {
    placeholder: string;
    noResults: string;
    searching: string;
  };

  // Movie Details
  movie: {
    rating: string;
    votes: string;
    genres: string;
    overview: string;
    releaseDate: string;
    status: string;
    budget: string;
    revenue: string;
    runtime: string;
    language: string;
    cast: string;
    director: string;
  };

  // Watchlist
  watchlist: {
    addButton: string;
    removeButton: string;
    addedButton: string;
    empty: string;
    errorAdding: string;
    errorRemoving: string;
    title: string;
  };

  // Loading & Errors
  common: {
    loading: string;
    error: string;
    errorOccurred: string;
    tryAgain: string;
    back: string;
    close: string;
    noData: string;
    unavailable: string;
  };

  // Pagination
  pagination: {
    previous: string;
    next: string;
    page: string;
    of: string;
  };
}

export const translations: Record<Locale, Translations> = {
  en: {
    // App
    app: {
      title: 'MovieBuff',
      subtitle: 'Discover Movies from Around the World',
    },

    // Navigation & Tabs
    navigation: {
      browse: 'Browse',
      watchlist: 'Watchlist',
      myWatchlist: '★ My Watchlist',
    },

    // Categories
    categories: {
      popular: 'Popular',
      nowPlaying: 'Now Playing',
      upcoming: 'Upcoming',
      topRated: 'Top Rated',
    },

    // Search
    search: {
      placeholder: 'Search movies...',
      noResults: 'No movies found',
      searching: 'Searching...',
    },

    // Movie Details
    movie: {
      rating: 'Rating',
      votes: 'votes',
      genres: 'Genres',
      overview: 'Overview',
      releaseDate: 'Release Date',
      status: 'Status',
      budget: 'Budget',
      revenue: 'Revenue',
      runtime: 'Runtime',
      language: 'Language',
      cast: 'Cast',
      director: 'Director',
    },

    // Watchlist
    watchlist: {
      addButton: '☆ Add to Watchlist',
      removeButton: '★ Remove from Watchlist',
      addedButton: '★ In Watchlist',
      empty: 'No movies in your watchlist yet',
      errorAdding: 'Failed to add to watchlist',
      errorRemoving: 'Failed to remove from watchlist',
      title: 'My Watchlist',
    },

    // Loading & Errors
    common: {
      loading: 'Loading...',
      error: 'Error',
      errorOccurred: 'An error occurred',
      tryAgain: 'Try Again',
      back: 'Back',
      close: 'Close',
      noData: 'No data available',
      unavailable: 'Unavailable',
    },

    // Pagination
    pagination: {
      previous: 'Previous',
      next: 'Next',
      page: 'Page',
      of: 'of',
    },
  },
};

/**
 * Get localized text
 * @param locale - Language locale (currently only 'en')
 * @returns Translations object for the specified locale
 */
export const getLocale = (locale: Locale = 'en'): Translations => {
  return translations[locale] || translations.en;
};

// Export default English translations for convenience
export const i18n = translations.en;
