import React, { useMemo, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import { MovieDetails } from '@repo/api';
import { useMovieClient } from '../../shared/hooks';
import { IMAGE_SIZES, CAST_DISPLAY_LIMIT } from '../../shared/constants';
import { Rating } from '../Rating/Rating.native';
import { GenreTag } from '../GenreTag/GenreTag.native';
import {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  BORDER_RADIUS,
} from '../../shared/constants';

export interface FeaturedMovieProps {
  movie: MovieDetails;
  onPress?: (movie: MovieDetails) => void;
  onWatchlistToggle?: () => void;
  isInWatchlist?: boolean;
}

export const FeaturedMovie = React.memo<FeaturedMovieProps>(
  ({ movie, onPress, onWatchlistToggle, isInWatchlist = false }) => {
    const movieClient = useMovieClient();

    const backdropUrl = useMemo(
      () =>
        movie.backdrop_path
          ? movieClient.getBackdropUrl(
              movie.backdrop_path,
              IMAGE_SIZES.BACKDROP_MEDIUM
            )
          : null,
      [movie.backdrop_path]
    );

    const genresToShow = useMemo(
      () => (movie.genres ? movie.genres.slice(0, CAST_DISPLAY_LIMIT) : []),
      [movie.genres]
    );

    const handleButtonPress = useCallback(() => {
      onPress?.(movie);
    }, [onPress, movie]);

    return (
      <View style={styles.container}>
        {/* Backdrop Image Container */}
        <View style={styles.backdropContainer}>
          {backdropUrl ? (
            <Image
              source={{ uri: backdropUrl }}
              style={styles.backdropImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.placeholderImage} />
          )}

          {/* Gradient Overlay */}
          <View style={styles.gradientOverlay} pointerEvents="none" />

          {/* Content Overlay */}
          <View style={styles.content} pointerEvents="box-none">
            <Text style={styles.title} numberOfLines={3}>
              {movie.title}
            </Text>

            {/* Rating */}
            {movie.vote_average !== undefined && (
              <View style={styles.ratingContainer}>
                <Rating
                  rating={movie.vote_average}
                  votesCount={movie.vote_count}
                />
              </View>
            )}

            {/* Genres */}
            {genresToShow.length > 0 && (
              <View style={styles.genresContainer}>
                {genresToShow.map((genre: { id: number; name: string }) => (
                  <View key={genre.id} style={styles.genreTag}>
                    <GenreTag name={genre.name} />
                  </View>
                ))}
              </View>
            )}

            {/* Overview */}
            {movie.overview && (
              <Text style={styles.overview} numberOfLines={4}>
                {movie.overview}
              </Text>
            )}

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <Pressable
                style={({ pressed }) => [
                  styles.primaryButton,
                  pressed && styles.primaryButtonPressed,
                ]}
                onPress={handleButtonPress}
                pointerEvents="box-only"
              >
                <Text style={styles.buttonText}>View Details</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.secondaryButton,
                  pressed && styles.secondaryButtonPressed,
                ]}
                onPress={onWatchlistToggle}
                pointerEvents="box-only"
              >
                <Text
                  style={[
                    styles.secondaryButtonText,
                    isInWatchlist && styles.secondaryButtonTextActive,
                  ]}
                >
                  {isInWatchlist ? '♥ Saved' : '♡ Save'}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    );
  }
);

FeaturedMovie.displayName = 'FeaturedMovie';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 450,
    backgroundColor: COLORS.BG_LIGHT,
    overflow: 'hidden',
  },
  backdropContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdropImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SPACING.LG,
    paddingBottom: SPACING.XL,
  },
  placeholderImage: {
    flex: 1,
    width: '100%',
    backgroundColor: '#333',
  },
  title: {
    fontSize: TYPOGRAPHY.FONT_SIZE['2XL'],
    fontWeight: '700',
    color: '#fff',
    marginBottom: SPACING.MD,
    letterSpacing: 0.5,
  },
  ratingContainer: {
    marginBottom: SPACING.MD,
    flexDirection: 'row',
    alignItems: 'center',
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.SM,
    marginBottom: SPACING.MD,
  },
  genreTag: {
    marginRight: SPACING.SM,
  },
  overview: {
    fontSize: TYPOGRAPHY.FONT_SIZE.BASE,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 22,
    marginBottom: SPACING.LG,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: SPACING.MD,
    marginTop: SPACING.MD,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: SPACING.MD,
    borderRadius: BORDER_RADIUS.MD,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonPressed: {
    backgroundColor: COLORS.PRIMARY_DARK,
    opacity: 0.8,
  },
  buttonText: {
    color: '#fff',
    fontSize: TYPOGRAPHY.FONT_SIZE.BASE,
    fontWeight: '600',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: SPACING.MD,
    borderRadius: BORDER_RADIUS.MD,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  secondaryButtonPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    opacity: 0.8,
  },
  secondaryButtonText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: TYPOGRAPHY.FONT_SIZE.BASE,
    fontWeight: '600',
  },
  secondaryButtonTextActive: {
    color: '#ff6b6b',
  },
});
