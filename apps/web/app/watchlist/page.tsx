'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { WatchlistScreen } from '@repo/ui';
import { loadWatchlist } from '@repo/store';
import type { RootState, AppDispatch } from '@repo/store';

export default function WatchlistPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { movies, loading } = useSelector((state: RootState) => state.watchlist);

  // Load watchlist on mount
  useEffect(() => {
    dispatch(loadWatchlist());
  }, [dispatch]);

  const handleMoviePress = (movieId: number) => {
    router.push(`/movies/${movieId}`);
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
    <WatchlistScreen
      movies={movies}
      onMoviePress={handleMoviePress}
      onBack={handleBack}
    />
  );
}
