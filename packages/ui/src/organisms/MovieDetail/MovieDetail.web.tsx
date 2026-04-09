'use client';

import * as React from 'react';
import { MovieDetails } from '@repo/api';
import { useMovieClient } from '../../shared/hooks';
import { CAST_DISPLAY_LIMIT, IMAGE_SIZES } from '../../shared/constants';
import { WatchlistButton } from '../../atoms/WatchlistButton';
import styles from './MovieDetail.web.module.css';

export interface MovieDetailProps {
  movie: MovieDetails;
  onBack?: () => void;
  isLoading?: boolean;
  isInWatchlist?: boolean;
  onWatchlistToggle?: () => void;
}

/**
 * MovieDetail - Platform-specific for Web (Next.js)
 * Clean structure matching mobile for consistency
 * Responsive design with focus on content
 */
export const MovieDetail = React.memo<MovieDetailProps>(
  ({ movie, onBack, isLoading = false, isInWatchlist = false, onWatchlistToggle }) => {
    const movieClient = useMovieClient();
    const backdropUrl = React.useMemo(
      () => movieClient.getBackdropUrl(movie.backdrop_path, IMAGE_SIZES.BACKDROP_MEDIUM),
      [movie.backdrop_path, movieClient]
    );

    const castMembers = React.useMemo(
      () => movie.credits?.cast.slice(0, CAST_DISPLAY_LIMIT) || [],
      [movie.credits?.cast]
    );

    return (
      <div className={styles.container}>
        {/* Backdrop */}
        {backdropUrl && (
          <div className={styles.backdropWrapper}>
            <img
              src={backdropUrl}
              alt={movie.title}
              className={styles.backdrop}
            />
            <div className={styles.backdropOverlay} />
          </div>
        )}

        {/* Header with Back Button and Watchlist Button */}
        <div className={styles.header}>
          <button
            className={styles.backButton}
            onClick={onBack}
            aria-label="Go back"
          >
            ← Back
          </button>
          {onWatchlistToggle && (
            <WatchlistButton
              isInWatchlist={isInWatchlist}
              onPress={onWatchlistToggle}
            />
          )}
        </div>

        {/* Main Content */}
        <div className={styles.content}>
          {/* Title and Rating */}
          <h1 className={styles.title}>{movie.title}</h1>
          <div className={styles.ratingContainer}>
            <span className={styles.rating}>★ {movie.vote_average.toFixed(1)}</span>
            <span className={styles.releaseDate}>
              {new Date(movie.release_date).getFullYear()}
            </span>
          </div>

          {/* Overview */}
          <h2 className={styles.sectionTitle}>Overview</h2>
          <p className={styles.overview}>{movie.overview}</p>

          {/* Details Grid */}
          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Runtime</span>
              <span className={styles.detailValue}>{movie.runtime} min</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Budget</span>
              <span className={styles.detailValue}>
                ${(movie.budget / 1000000).toFixed(1)}M
              </span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Revenue</span>
              <span className={styles.detailValue}>
                ${(movie.revenue / 1000000).toFixed(1)}M
              </span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Status</span>
              <span className={styles.detailValue}>{movie.status}</span>
            </div>
          </div>

          {/* Genres */}
          {movie.genres && movie.genres.length > 0 && (
            <>
              <h2 className={styles.sectionTitle}>Genres</h2>
              <div className={styles.genres}>
                {movie.genres.map((genre) => (
                  <span key={genre.id} className={styles.genreTag}>
                    {genre.name}
                  </span>
                ))}
              </div>
            </>
          )}

          {/* Cast */}
          {castMembers.length > 0 && (
            <>
              <h2 className={styles.sectionTitle}>Cast</h2>
              <div className={styles.castContainer}>
                {castMembers.map((actor) => (
                  <div key={actor.id} className={styles.castMember}>
                    <div className={styles.castImageContainer}>
                      {actor.profile_path ? (
                        <img
                          src={movieClient.getImageUrl(
                            actor.profile_path,
                            'w342'
                          )}
                          alt={actor.name}
                          className={styles.castImage}
                        />
                      ) : (
                        <div className={styles.castPlaceholder}>
                          <span className={styles.castPlaceholderIcon}>👤</span>
                        </div>
                      )}
                    </div>
                    <h3 className={styles.castName}>{actor.name}</h3>
                    <p className={styles.castCharacter}>{actor.character}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
);

MovieDetail.displayName = 'MovieDetail';
