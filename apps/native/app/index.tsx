import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
  memo,
} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import {
  FeaturedMovie,
  MovieCard,
  i18n,
  COLORS,
  SPACING,
  TYPOGRAPHY,
  BORDER_RADIUS,
} from '@repo/ui';
import {
  fetchMovies,
  searchMovies,
  clearSelectedMovie,
  addToWatchlist,
  removeFromWatchlist,
} from '@repo/store';
import type { AppDispatch, RootState } from '@repo/store';
import type { MovieDetails } from '@repo/api';

// Memoized movie card item component - prevents unnecessary re-renders
const MovieCardItem = memo(
  ({ item, onPress }: { item: any; onPress: (id: number) => void }) => (
    <Pressable
      style={styles.cardWrapper}
      onPress={() => onPress(item.id)}
    >
      <MovieCard movie={item} onPress={() => onPress(item.id)} />
    </Pressable>
  )
);

MovieCardItem.displayName = 'MovieCardItem';

// Memoized list footer component
const ListFooter = memo(({ isLoading }: { isLoading: boolean }) => {
  if (!isLoading) return null;
  return (
    <View style={styles.footerLoader}>
      <ActivityIndicator size="small" color={COLORS.PRIMARY} />
    </View>
  );
});

ListFooter.displayName = 'ListFooter';

export default function MoviesScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { movies, loading, error, totalPages } = useSelector(
    (state: RootState) => state.movies
  );
  const watchlistMovies = useSelector(
    (state: RootState) => state.watchlist.movies
  );

  const [selectedCategory, setSelectedCategory] = useState<
    'popular' | 'now_playing' | 'upcoming' | 'top_rated'
  >('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  
  // Refs for pagination state
  const canLoadMoreRef = useRef(true);
  useEffect(() => {
    if (searchQuery.trim()) {
      dispatch(searchMovies({ query: searchQuery, page: 1 }));
    } else {
      dispatch(fetchMovies({ category: selectedCategory, page: 1 }));
    }
    canLoadMoreRef.current = true;
    setLoadingMore(false);
  }, [selectedCategory, searchQuery, dispatch]);

  // Handle page changes
  useEffect(() => {
    if (page > 1) {
      if (searchQuery.trim()) {
        dispatch(searchMovies({ query: searchQuery, page }));
      } else {
        dispatch(fetchMovies({ category: selectedCategory, page }));
      }
    }
  }, [page, dispatch, selectedCategory, searchQuery]);

  // Reset loading flag when loading completes
  useEffect(() => {
    if (page > 1 && !loading) {
      setLoadingMore(false);
      canLoadMoreRef.current = true;
    }
  }, [loading, page]);

  // Reload movies when screen comes back into focus (from watchlist/movie detail)
  useFocusEffect(
    useCallback(() => {
      if (movies.length === 0 && !searchQuery.trim()) {
        setPage(1);
        dispatch(fetchMovies({ category: selectedCategory, page: 1 }));
      }
    }, [movies.length, searchQuery, selectedCategory, dispatch])
  );

  // Handle search
  const handleSearch = useCallback((text: string) => {
    setSearchQuery(text);
    setPage(1);
  }, []);

  // Handle movie card click
  const handleMovieClick = useCallback(
    (movieId: number) => {
      dispatch(clearSelectedMovie());
      router.push(`/movies/${movieId}`);
    },
    [router, dispatch]
  );

  // Handle featured movie details click
  const handleFeaturedMoviePress = useCallback(
    (movie: MovieDetails) => {
      dispatch(clearSelectedMovie());
      router.push(`/movies/${movie.id}`);
    },
    [router, dispatch]
  );

  // Handle featured movie watchlist toggle
  const handleFeaturedWatchlistToggle = useCallback(() => {
    if (movies.length === 0) return;
    const featuredMovie = movies[0];
    const isInWatchlist = watchlistMovies.some(
      (m) => m.id === featuredMovie.id
    );
    if (isInWatchlist) {
      dispatch(removeFromWatchlist(featuredMovie.id));
    } else {
      dispatch(addToWatchlist(featuredMovie));
    }
  }, [movies, watchlistMovies, dispatch]);

  // Check if first movie is in watchlist
  const isFeaturedInWatchlist = useMemo(
    () =>
      movies.length > 0 &&
      watchlistMovies.some((m) => m.id === movies[0].id),
    [movies, watchlistMovies]
  );

  // Memoize category buttons
  const categoryButtons = useMemo(
    () =>
      [
        { id: 'popular', label: i18n.categories.popular },
        { id: 'now_playing', label: i18n.categories.nowPlaying },
        { id: 'upcoming', label: i18n.categories.upcoming },
        { id: 'top_rated', label: i18n.categories.topRated },
      ] as const,
    []
  );

  // Key extractor - uses stable unique ID
  const keyExtractor = useCallback((item: any) => item.id.toString(), []);

  // Handle end reached for pagination - prevents duplicate calls
  const handleEndReached = useCallback(() => {
    // Simple, clear condition checks
    const hasMorePages = page < totalPages;
    const isNotLoading = !loading && !loadingMore;
    const canLoad = canLoadMoreRef.current;

    if (!hasMorePages || !isNotLoading || !canLoad) {
      return;
    }

    // Mark that we're loading more and prevent further calls
    canLoadMoreRef.current = false;
    setLoadingMore(true);
    setPage((prevPage) => prevPage + 1);
  }, [page, totalPages, loading, loadingMore]);

  // Render loading state
  if (loading && movies.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.headerSection}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{i18n.app.title}</Text>
            <Text style={styles.subtitleText}>{i18n.app.subtitle}</Text>
          </View>
          <Pressable
            style={styles.watchlistLink}
            onPress={() => router.push('/watchlist')}
          >
            <Text style={styles.watchlistLinkText}>
              {i18n.navigation.myWatchlist}
            </Text>
          </Pressable>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder={i18n.search.placeholder}
              placeholderTextColor={COLORS.TEXT_TERTIARY}
              value={searchQuery}
              onChangeText={handleSearch}
              editable={false}
            />
          </View>
        </View>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.PRIMARY} />
          <Text style={styles.loadingText}>{i18n.common.loading}</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Render error state
  if (error && movies.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.headerSection}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{i18n.app.title}</Text>
            <Text style={styles.subtitleText}>{i18n.app.subtitle}</Text>
          </View>
          <Pressable
            style={styles.watchlistLink}
            onPress={() => router.push('/watchlist')}
          >
            <Text style={styles.watchlistLinkText}>
              {i18n.navigation.myWatchlist}
            </Text>
          </Pressable>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder={i18n.search.placeholder}
              placeholderTextColor={COLORS.TEXT_TERTIARY}
              value={searchQuery}
              onChangeText={handleSearch}
              editable={false}
            />
          </View>
        </View>
        <View style={styles.loaderContainer}>
          <View style={styles.errorContainer}>
            <Text style={styles.error}>{error}</Text>
            <Pressable style={styles.retryButton} onPress={() => setPage(1)}>
              <Text style={styles.retryButtonText}>{i18n.common.tryAgain}</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // Render empty state
  if (!loading && movies.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.headerSection}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{i18n.app.title}</Text>
            <Text style={styles.subtitleText}>{i18n.app.subtitle}</Text>
          </View>
          <Pressable
            style={styles.watchlistLink}
            onPress={() => router.push('/watchlist')}
          >
            <Text style={styles.watchlistLinkText}>
              {i18n.navigation.myWatchlist}
            </Text>
          </Pressable>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder={i18n.search.placeholder}
              placeholderTextColor={COLORS.TEXT_TERTIARY}
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>
        </View>
        <View style={styles.loaderContainer}>
          <Text style={styles.emptyText}>{i18n.search.noResults}</Text>
          <Text style={styles.emptySubtext}>{i18n.common.tryAgain}</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Main content view with movies
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.headerSection}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{i18n.app.title}</Text>
          <Text style={styles.subtitleText}>{i18n.app.subtitle}</Text>
        </View>

        <Pressable
          style={styles.watchlistLink}
          onPress={() => router.push('/watchlist')}
        >
          <Text style={styles.watchlistLinkText}>
            {i18n.navigation.myWatchlist}
          </Text>
        </Pressable>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={i18n.search.placeholder}
            placeholderTextColor={COLORS.TEXT_TERTIARY}
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>

        {/* Category Filters */}
        {!searchQuery && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryContainer}
            contentContainerStyle={styles.categoryContent}
          >
            {categoryButtons.map((cat) => (
              <Pressable
                key={cat.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === cat.id && styles.categoryButtonActive,
                ]}
                onPress={() => {
                  setSelectedCategory(cat.id as any);
                  setPage(1);
                }}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    selectedCategory === cat.id &&
                      styles.categoryButtonTextActive,
                  ]}
                >
                  {cat.label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        )}
      </View>

      {/* Scrollable movies grid using FlatList */}
      <FlatList
        key={`flatlist-${selectedCategory}`}
        data={searchQuery.trim() ? movies : movies}
        renderItem={({ item }: any) => (
          <MovieCardItem item={item} onPress={handleMovieClick} />
        )}
        keyExtractor={keyExtractor}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.contentContainer}
        scrollEnabled={movies.length > 0}
        scrollEventThrottle={16}
        removeClippedSubviews={false}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        maxToRenderPerBatch={20}
        updateCellsBatchingPeriod={30}
        initialNumToRender={20}
        windowSize={50}
        ListHeaderComponent={
          !searchQuery && movies.length > 0 ? (
            <View style={styles.featuredMovieContainer}>
              <FeaturedMovie
                movie={movies[0] as MovieDetails}
                onPress={handleFeaturedMoviePress}
                onWatchlistToggle={handleFeaturedWatchlistToggle}
                isInWatchlist={isFeaturedInWatchlist}
              />
            </View>
          ) : null
        }
        ListFooterComponent={<ListFooter isLoading={loadingMore} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerSection: {
    backgroundColor: COLORS.PRIMARY,
  },
  titleContainer: {
    paddingHorizontal: SPACING.XL - 4,
    paddingVertical: SPACING.MD,
    backgroundColor: COLORS.PRIMARY,
    alignItems: 'center',
  },
  titleText: {
    fontSize: TYPOGRAPHY.FONT_SIZE['4XL'] - 6,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.EXTRABOLD as '800',
    color: COLORS.TEXT_LIGHT,
    marginBottom: SPACING.SM,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: TYPOGRAPHY.FONT_SIZE.LG,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.MEDIUM as '500',
    color: COLORS.TEXT_LIGHT,
    textAlign: 'center',
  },
  watchlistLink: {
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.SM,
    marginVertical: SPACING.SM,
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: BORDER_RADIUS.MD,
  },
  watchlistLinkText: {
    fontSize: TYPOGRAPHY.FONT_SIZE.BASE,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.SEMIBOLD as '600',
    color: COLORS.TEXT_LIGHT,
  },
  searchContainer: {
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.SM,
    backgroundColor: COLORS.TEXT_LIGHT,
    alignItems: 'center',
  },
  searchInput: {
    width: '100%',
    paddingHorizontal: SPACING.XL - 4,
    paddingVertical: 14,
    borderRadius: BORDER_RADIUS.FULL,
    backgroundColor: COLORS.BG_LIGHT,
    fontSize: TYPOGRAPHY.FONT_SIZE.LG,
    color: COLORS.TEXT_PRIMARY,
    borderWidth: 2,
    borderColor: COLORS.SECONDARY,
  },
  categoryContainer: {
    backgroundColor: COLORS.TEXT_LIGHT,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.SECONDARY,
  },
  categoryContent: {
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.LG,
    gap: 12,
    justifyContent: 'center',
  },
  categoryButton: {
    paddingHorizontal: SPACING.XL,
    paddingVertical: 11,
    borderRadius: BORDER_RADIUS.FULL,
    backgroundColor: COLORS.TEXT_LIGHT,
    borderWidth: 2,
    borderColor: COLORS.SECONDARY,
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  categoryButtonActive: {
    backgroundColor: COLORS.PRIMARY,
    borderColor: COLORS.PRIMARY,
  },
  categoryButtonText: {
    fontSize: TYPOGRAPHY.FONT_SIZE.MD,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.SEMIBOLD as '600',
    color: COLORS.TEXT_PRIMARY,
  },
  categoryButtonTextActive: {
    color: COLORS.TEXT_LIGHT,
  },
  featuredMovieContainer: {
    marginBottom: SPACING.XL,
  },
  contentContainer: {
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.MD,
    gap: 12,
    paddingBottom: SPACING.XL,
  },
  cardWrapper: {
    flex: 1,
    minWidth: 0,
  },
  row: {
    gap: 12,
    justifyContent: 'space-around',
    width: '100%',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.MD,
  },
  loadingText: {
    fontSize: TYPOGRAPHY.FONT_SIZE.MD,
    color: COLORS.PRIMARY,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.SEMIBOLD as '600',
  },
  footerLoader: {
    paddingVertical: SPACING.LG,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: TYPOGRAPHY.FONT_SIZE.XL - 1,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.BOLD as '700',
    color: COLORS.TEXT_PRIMARY,
  },
  emptySubtext: {
    fontSize: TYPOGRAPHY.FONT_SIZE.MD,
    color: COLORS.TEXT_TERTIARY,
  },
  errorContainer: {
    marginHorizontal: SPACING.LG,
    marginVertical: SPACING.MD,
    padding: SPACING.LG,
    backgroundColor: COLORS.ERROR_SOFT_BG,
    borderRadius: BORDER_RADIUS.LG,
    borderWidth: 2,
    borderColor: COLORS.ERROR_BORDER,
  },
  error: {
    color: COLORS.ERROR,
    fontSize: TYPOGRAPHY.FONT_SIZE.MD,
    marginBottom: SPACING.MD,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.SEMIBOLD as '600',
  },
  retryButton: {
    alignSelf: 'center',
    paddingHorizontal: SPACING.XL - 4,
    paddingVertical: 10,
    backgroundColor: COLORS.ERROR,
    borderRadius: BORDER_RADIUS.MD,
  },
  retryButtonText: {
    color: COLORS.TEXT_LIGHT,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.BOLD as '700',
    fontSize: TYPOGRAPHY.FONT_SIZE.BASE,
  },
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.PRIMARY,
  },
});
