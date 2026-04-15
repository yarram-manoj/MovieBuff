'use client';

import * as React from 'react';
import { Movie } from '@repo/api';
import { useMovieClient } from '../../shared/hooks';
import { IMAGE_SIZES } from '../../shared/constants';
import styles from './MovieCard.web.module.css';

export interface MovieCardProps {
  movie: Movie;
  onPress?: (movie: Movie) => void;
  isLoading?: boolean;
}

/**
 * MovieCard - Platform-specific for Web (Next.js)
 * Uses CSS modules for styling with TailwindCSS support
 */
export const MovieCard = React.memo<MovieCardProps>(
  ({ movie, onPress, isLoading = false }) => {
    const movieClient = useMovieClient();
    const posterUrl = movieClient.getImageUrl(
      movie.poster_path,
      IMAGE_SIZES.POSTER_SMALL
    );

    const handleClick = React.useCallback(() => {
      onPress?.(movie);
    }, [movie, onPress]);

    const releaseYear = React.useMemo(() => {
      if (!movie.release_date) return 'N/A';
      const parsed = new Date(movie.release_date);
      const year = parsed.getFullYear();
      return Number.isFinite(year) ? String(year) : 'N/A';
    }, [movie.release_date]);

    const ratingValue = React.useMemo(() => {
      if (typeof movie.vote_average !== 'number') return '0.0';
      return Number.isFinite(movie.vote_average)
        ? movie.vote_average.toFixed(1)
        : '0.0';
    }, [movie.vote_average]);

    return (
      <button
        className={styles.card}
        onClick={handleClick}
        disabled={isLoading}
        aria-label={`View details for ${movie.title}`}
      >
        <div className={styles.imageContainer}>
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={movie.title}
              className={styles.poster}
              onLoad={() => {}}
              onError={() => {}}
            />
          ) : (
            <div className={styles.placeholderImage}>
              <span className={styles.placeholderText}>No Image</span>
            </div>
          )}
        </div>
        <div className={styles.content}>
          <h3 className={styles.title} title={movie.title}>
            {movie.title}
          </h3>
          <div className={styles.footer}>
            <span className={styles.date}>{releaseYear}</span>
            <div className={styles.rating}>
              <span className={styles.ratingText}>★ {ratingValue}</span>
            </div>
          </div>
        </div>
      </button>
    );
  }
);

MovieCard.displayName = 'MovieCard';
