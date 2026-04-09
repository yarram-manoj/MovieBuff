import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
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
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { MovieCard, i18n } from '@repo/ui';
import { fetchMovies, searchMovies, clearSelectedMovie } from '@repo/store';
import type { AppDispatch, RootState } from '@repo/store';

// Calculate item height: aspect ratio 2/3 means height = width * 1.5
// For 2 columns with 12px gap: (width - 6) / 2 per item, with padding
// Note: Now using dynamic height to accommodate text content

export default function MoviesScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { movies, loading, error, totalPages } = useSelector(
    (state: RootState) => state.movies
  );

  const [selectedCategory, setSelectedCategory] = useState<
    'popular' | 'now_playing' | 'upcoming' | 'top_rated'
  >('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const isFetchingRef = useRef(false);
  const lastLoadTimeRef = useRef(0);

  // Load movies on component mount and when category changes
  useEffect(() => {
    isFetchingRef.current = true;
    if (searchQuery.trim()) {
      dispatch(searchMovies({ query: searchQuery, page }));
    } else {
      dispatch(fetchMovies({ category: selectedCategory, page }));
    }
  }, [selectedCategory, page, searchQuery, dispatch]);

  // Mark fetch complete when loading finishes
  useEffect(() => {
    if (!loading) {
      isFetchingRef.current = false;
    }
  }, [loading]);

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

  // Render individual movie card
  const renderMovieCard = useCallback(
    ({ item }: any) => (
      <Pressable
        style={styles.cardWrapper}
        onPress={() => handleMovieClick(item.id)}
      >
        <MovieCard movie={item} onPress={() => handleMovieClick(item.id)} />
      </Pressable>
    ),
    [handleMovieClick]
  );

  // Key extractor
  const keyExtractor = useCallback((item: any) => item.id.toString(), []);

  // Handle end reached for pagination
  const handleEndReached = useCallback(() => {
    // Prevent duplicate requests: check fetch in progress and cooldown
    const now = Date.now();
    const timeSinceLastLoad = now - lastLoadTimeRef.current;

    if (
      isFetchingRef.current ||
      page >= totalPages ||
      timeSinceLastLoad < 500
    ) {
      return;
    }

    isFetchingRef.current = true;
    lastLoadTimeRef.current = now;
    setPage((prevPage) => prevPage + 1);
  }, [page, totalPages]);

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
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={handleSearch}
              editable={false}
            />
          </View>
        </View>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#667eea" />
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
              placeholderTextColor="#999"
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
              placeholderTextColor="#999"
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
            placeholder="Search movies..."
            placeholderTextColor="#999"
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
                  setSelectedCategory(cat.id);
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

      {/* Scrollable movies grid */}
      <FlatList
        data={movies}
        renderItem={renderMovieCard}
        keyExtractor={keyExtractor}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.contentContainer}
        scrollEnabled={!loading}
        scrollEventThrottle={32}
        removeClippedSubviews={true}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.4}
        maxToRenderPerBatch={4}
        updateCellsBatchingPeriod={100}
        initialNumToRender={4}
        windowSize={8}
        ListFooterComponent={
          loading && movies.length > 0 ? (
            <View style={styles.footerLoader}>
              <ActivityIndicator size="small" color="#667eea" />
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerSection: {
    backgroundColor: '#667eea',
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#667eea',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 42,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.95)',
    textAlign: 'center',
  },
  watchlistLink: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 8,
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
  },
  watchlistLinkText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  searchInput: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 28,
    backgroundColor: '#f5f5f5',
    fontSize: 16,
    color: '#333',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  categoryContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  categoryContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
    justifyContent: 'center',
  },
  categoryButton: {
    paddingHorizontal: 24,
    paddingVertical: 11,
    borderRadius: 24,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  categoryButtonActive: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  categoryButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  categoryButtonTextActive: {
    color: '#fff',
  },
  contentContainer: {
    paddingHorizontal: 12,
    paddingVertical: 20,
    gap: 12,
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
    gap: 12,
  },
  loadingText: {
    fontSize: 15,
    color: '#667eea',
    fontWeight: '600',
  },
  footerLoader: {
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#333',
  },
  emptySubtext: {
    fontSize: 15,
    color: '#999',
  },
  errorContainer: {
    marginHorizontal: 16,
    marginVertical: 12,
    padding: 16,
    backgroundColor: 'rgba(255, 200, 200, 0.1)',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ffb3b3',
  },
  error: {
    color: '#d32f2f',
    fontSize: 15,
    marginBottom: 12,
    fontWeight: '600',
  },
  retryButton: {
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#d32f2f',
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#667eea',
  },
});
