import React from 'react';
import { Movie } from '@repo/api';
import { MovieCard } from '../MovieCard';
import styles from './WatchlistScreen.web.module.css';

export interface WatchlistScreenProps {
  movies: Movie[];
  onMoviePress: (movieId: number) => void;
  onBack?: () => void;
  loading?: boolean;
}

export const WatchlistScreen: React.FC<WatchlistScreenProps> = ({
  movies,
  onMoviePress,
  onBack,
}) => {
  if (movies.length === 0) {
    return (
      <div className={styles.container}>
        {onBack && (
          <div className={styles.headerContainer}>
            <button className={styles.backButton} onClick={onBack}>
              ← Back
            </button>
          </div>
        )}
        <div className={styles.emptyContainer}>
          <p className={styles.emptyText}>No movies in your watchlist yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {onBack && (
        <div className={styles.headerContainer}>
          <button className={styles.backButton} onClick={onBack}>
            ← Back
          </button>
        </div>
      )}
      <h1 className={styles.header}>My Watchlist</h1>
      <div className={styles.grid}>
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => onMoviePress(movie.id)}
            className={styles.cardWrapper}
          >
            <MovieCard movie={movie} onPress={() => onMoviePress(movie.id)} />
          </div>
        ))}
      </div>
    </div>
  );
};
