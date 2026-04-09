import React, { useEffect } from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { MovieDetail } from "@repo/ui";
import { fetchMovieDetails, clearSelectedMovie, addToWatchlist, removeFromWatchlist, saveWatchlistToStorage } from "@repo/store";
import type { AppDispatch, RootState } from "@repo/store";

export default function MovieDetailScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const movieId = parseInt(id as string, 10);

  const { selectedMovie: movie, loading, error } = useSelector(
    (state: RootState) => state.movies
  );
  const { movies: watchlistMovies } = useSelector(
    (state: RootState) => state.watchlist
  );

  const isInWatchlist = movie ? watchlistMovies.some((m) => m.id === movie.id) : false;

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
    dispatch(clearSelectedMovie());
    router.back();
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
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#667eea" />
        <Text style={styles.loadingText}>Loading movie details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  if (!movie) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Movie not found.</Text>
      </View>
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

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: "#999",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  error: {
    fontSize: 16,
    color: "#c33",
    textAlign: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#333",
  },
});
