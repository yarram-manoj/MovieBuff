'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useParams } from 'next/navigation';
import { MovieDetail } from '@repo/ui';
import {
  fetchMovieDetails,
  clearSelectedMovie,
  addToWatchlist,
  removeFromWatchlist,
  saveWatchlistToStorage,
} from '@repo/store';
import type { AppDispatch, RootState } from '@repo/store';
import styles from '../../../styles/movie-detail.module.css';

export default function MovieDetailPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const params = useParams();
  const movieId = parseInt(params.id as string, 10);

  const {
    selectedMovie: movie,
    loading,
    error,
  } = useSelector((state: RootState) => state.movies);
  const { movies: watchlistMovies } = useSelector(
    (state: RootState) => state.watchlist
  );

  const isInWatchlist = movie
    ? watchlistMovies.some((m) => m.id === movie.id)
    : false;

  useEffect(() => {
    if (movieId) {
      dispatch(fetchMovieDetails(movieId));
    }

    // Cleanup on unmount
    return () => {
      dispatch(clearSelectedMovie());
    };
  }, [movieId, dispatch]);

  const handleBack = React.useCallback(() => {
    router.back();
    dispatch(clearSelectedMovie());
  }, [router, dispatch]);

  const handleWatchlistToggle = React.useCallback(() => {
    if (!movie) return;

    if (isInWatchlist) {
      dispatch(removeFromWatchlist(movie.id));
    } else {
      dispatch(addToWatchlist(movie));
    }

    // Save to persistent storage
    const updatedWatchlist = isInWatchlist
      ? watchlistMovies.filter((m) => m.id !== movie.id)
      : [...watchlistMovies, movie];
    dispatch(saveWatchlistToStorage(updatedWatchlist));
  }, [movie, isInWatchlist, watchlistMovies, dispatch]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner} />
        <p>Loading movie details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <button onClick={handleBack} className={styles.backButton}>
          ← Back
        </button>
        <p className={styles.error}>{error}</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className={styles.emptyContainer}>
        <button onClick={handleBack} className={styles.backButton}>
          ← Back
        </button>
        <p>Movie not found.</p>
      </div>
    );
  }

  return (
    <MovieDetail
      movie={movie}
      onBack={handleBack}
      isLoading={loading}
      isInWatchlist={isInWatchlist}
      onWatchlistToggle={handleWatchlistToggle}
    />
  );
}
