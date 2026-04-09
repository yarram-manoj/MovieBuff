import * as React from 'react';
import { Text, Pressable, StyleSheet, Image, View } from 'react-native';
import { Movie } from '@repo/api';
import { useMovieClient } from '../../shared/hooks';
import { IMAGE_SIZES } from '../../shared/constants';

export interface MovieCardProps {
  movie: Movie;
  onPress?: (movie: Movie) => void;
  isLoading?: boolean;
}

/**
 * MovieCard - Platform-specific for Native (React Native)
 * Uses performant StyleSheet API instead of inline styling
 */
export const MovieCard = React.memo<MovieCardProps>(
  ({ movie, onPress, isLoading = false }) => {
    const movieClient = useMovieClient();
    const posterUrl = movieClient.getImageUrl(movie.poster_path, IMAGE_SIZES.POSTER_SMALL);

    return (
      <Pressable
        style={({ pressed }) => [
          styles.card,
          pressed && styles.cardPressed,
        ]}
        onPress={() => onPress?.(movie)}
        disabled={isLoading}
      >
        <View style={styles.imageContainer}>
          {posterUrl ? (
            <Image
              source={{ uri: posterUrl }}
              style={styles.poster}
            />
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderText}>No Image</Text>
            </View>
          )}
        </View>
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {movie.title}
          </Text>
          <View style={styles.footer}>
            <Text style={styles.date} numberOfLines={1}>
              {new Date(movie.release_date).getFullYear()}
            </Text>
            <View style={styles.rating}>
              <Text style={styles.ratingText}>
                ★ {movie.vote_average.toFixed(1)}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  }
);

MovieCard.displayName = 'MovieCard';

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: 4,
    marginVertical: 6,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
    flex: 1,
  },
  cardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 2 / 3,
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
  },
  poster: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  placeholderText: {
    color: '#bbb',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: 12,
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
    color: '#1a1a1a',
    lineHeight: 17,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 6,
  },
  date: {
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
  },
  rating: {
    backgroundColor: '#FFB800',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
});
