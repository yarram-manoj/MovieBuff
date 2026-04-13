'use client';

import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { FeaturedMovie, MovieCard, i18n } from '@repo/ui';
import { fetchMovies, searchMovies, addToWatchlist, removeFromWatchlist } from '@repo/store';
import type { AppDispatch, RootState } from '@repo/store';
import type { MovieDetails } from '@repo/api';
import styles from '../../styles/movies.module.css';

export default function BrowseMoviesPage() {
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
  const initialFetchDoneRef = useRef(false);

  // Load movies on component mount and when category changes
  useEffect(() => {
    if (searchQuery.trim()) {
      dispatch(searchMovies({ query: searchQuery, page }));
    } else {
      dispatch(fetchMovies({ category: selectedCategory, page }));
    }
    initialFetchDoneRef.current = true;
  }, [selectedCategory, page, searchQuery, dispatch]);

  // Fallback: if movies are empty but we've already initialized, reload them
  // This handles the case of returning from watchlist/movie detail
  useEffect(() => {
    if (initialFetchDoneRef.current && movies.length === 0 && !loading && !searchQuery.trim()) {
      dispatch(fetchMovies({ category: selectedCategory, page: 1 }));
    }
  }, [movies.length]);

  // Scroll to movies grid when page changes
  useEffect(() => {
    if (page > 1) {
      const moviesGrid = document.querySelector(`.${styles.moviesGrid}`);
      if (moviesGrid) {
        setTimeout(() => {
          moviesGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 0);
      }
    }
  }, [page]);

  // Handle search with debounce
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  }, []);

  // Handle movie card click
  const handleMovieClick = useCallback(
    (movieId: number) => {
      router.push(`/movies/${movieId}`);
    },
    [router]
  );

  // Memoize category buttons to prevent unnecessary re-renders
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

  // Handle featured movie details click
  const handleFeaturedMoviePress = useCallback(
    (movie: MovieDetails) => {
      router.push(`/movies/${movie.id}`);
    },
    [router]
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

  // Handle watchlist navigation
  const handleWatchlistClick = useCallback(() => {
    router.push('/watchlist');
  }, [router]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <h1 className={styles.title}>{i18n.app.title}</h1>
          <button 
            onClick={handleWatchlistClick} 
            className={styles.watchlistLink}
            aria-label={i18n.navigation.myWatchlist}
          >
            {i18n.navigation.myWatchlist}
          </button>
        </div>
        <p className={styles.subtitle}>{i18n.app.subtitle}</p>
      </header>

      {/* Featured Movie Section */}
      {!searchQuery && movies.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <FeaturedMovie
            movie={movies[0] as MovieDetails}
            onPress={handleFeaturedMoviePress}
            onWatchlistToggle={handleFeaturedWatchlistToggle}
            isInWatchlist={isFeaturedInWatchlist}
          />
        </div>
      )}

      {/* Search Bar */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder={i18n.search.placeholder}
          value={searchQuery}
          onChange={handleSearch}
          className={styles.searchInput}
        />
      </div>

      {/* Category Filters */}
      {!searchQuery && (
        <div className={styles.categoryContainer}>
          {categoryButtons.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.categoryButton} ${
                selectedCategory === cat.id ? styles.active : ''
              }`}
              onClick={() => {
                setSelectedCategory(cat.id);
                setPage(1);
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className={styles.errorContainer}>
          <p className={styles.error}>{error}</p>
          <button onClick={() => setPage(1)} className={styles.retryButton}>
            {i18n.common.tryAgain}
          </button>
        </div>
      )}

      {/* Movies Grid */}
      <div className={styles.content}>
        {loading && movies.length === 0 ? (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner} />
            <p>{i18n.common.loading}</p>
          </div>
        ) : movies.length > 0 ? (
          <>
            <div className={styles.moviesGrid}>
              {movies
                .slice((page - 1) * 20, page * 20)
                .map((movie) => (
                  <div
                    key={movie.id}
                    className={styles.movieCardWrapper}
                    onClick={() => handleMovieClick(movie.id)}
                  >
                    <MovieCard
                      movie={movie}
                      isLoading={loading}
                    />
                  </div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className={styles.paginationContainer}>
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1 || loading}
                  className={styles.paginationButton}
                >
                  {loading && page > 1 && (
                    <div className={styles.paginationLoader} />
                  )}
                  {i18n.pagination.previous}
                </button>
                <span className={styles.paginationInfo}>
                  {i18n.pagination.page} {page} {i18n.pagination.of}{' '}
                  {totalPages}
                </span>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages || loading}
                  className={styles.paginationButton}
                >
                  {loading && page < totalPages && (
                    <div className={styles.paginationLoader} />
                  )}
                  {i18n.pagination.next}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className={styles.emptyContainer}>
            <p>{i18n.search.noResults}</p>
          </div>
        )}
      </div>
    </div>
  );
}
