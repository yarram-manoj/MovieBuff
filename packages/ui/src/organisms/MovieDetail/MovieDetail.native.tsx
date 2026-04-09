import * as React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import { MovieDetails } from '@repo/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMovieClient } from '../../shared/hooks';
import { CAST_DISPLAY_LIMIT, IMAGE_SIZES } from '../../shared/constants';
import { WatchlistButton } from '../../atoms/WatchlistButton/WatchlistButton.native';

export interface MovieDetailProps {
  movie: MovieDetails;
  onBack?: () => void;
  isLoading?: boolean;
  isInWatchlist?: boolean;
  onWatchlistToggle?: () => void;
}

/**
 * MovieDetail - Platform-specific for Native (React Native)
 * Uses SafeAreaView for edge-to-edge rendering on modern devices
 * Implements performance optimizations with React.memo and useMemo
 */
export const MovieDetail = React.memo<MovieDetailProps>(
  ({
    movie,
    onBack,
    isLoading = false,
    isInWatchlist = false,
    onWatchlistToggle,
  }) => {
    const movieClient = useMovieClient();
    const backdropUrl = React.useMemo(
      () =>
        movieClient.getBackdropUrl(
          movie.backdrop_path,
          IMAGE_SIZES.BACKDROP_MEDIUM
        ),
      [movie.backdrop_path, movieClient]
    );

    const castMembers = React.useMemo(
      () => movie.credits?.cast.slice(0, CAST_DISPLAY_LIMIT) || [],
      [movie.credits?.cast]
    );

    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Backdrop */}
          {backdropUrl && (
            <Image source={{ uri: backdropUrl }} style={styles.backdrop} />
          )}

          {/* Header with back button and watchlist button */}
          <View style={styles.header}>
            <Pressable style={styles.backButton} onPress={onBack || (() => {})}>
              <Text style={styles.backText}>← Back</Text>
            </Pressable>
            {onWatchlistToggle && (
              <WatchlistButton
                isInWatchlist={isInWatchlist}
                onPress={onWatchlistToggle}
              />
            )}
          </View>

          {/* Content */}
          <View style={styles.content}>
            {/* Title and Rating */}
            <Text style={styles.title}>{movie.title}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>
                ★ {movie.vote_average.toFixed(1)}
              </Text>
              <Text style={styles.releaseDate}>
                {new Date(movie.release_date).getFullYear()}
              </Text>
            </View>

            {/* Overview */}
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.overview}>{movie.overview}</Text>

            {/* Details Grid */}
            <View style={styles.detailsGrid}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Runtime</Text>
                <Text style={styles.detailValue}>{movie.runtime} min</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Budget</Text>
                <Text style={styles.detailValue}>
                  ${(movie.budget / 1000000).toFixed(1)}M
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Revenue</Text>
                <Text style={styles.detailValue}>
                  ${(movie.revenue / 1000000).toFixed(1)}M
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Status</Text>
                <Text style={styles.detailValue}>{movie.status}</Text>
              </View>
            </View>

            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>Genres</Text>
                <View style={styles.genres}>
                  {movie.genres.map((genre) => (
                    <View key={genre.id} style={styles.genreTag}>
                      <Text style={styles.genreText}>{genre.name}</Text>
                    </View>
                  ))}
                </View>
              </>
            )}

            {/* Cast */}
            {castMembers.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>Cast</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.castContainer}>
                    {castMembers.map((actor) => (
                      <View key={actor.id} style={styles.castMember}>
                        <View style={styles.castImageContainer}>
                          {actor.profile_path ? (
                            <Image
                              source={{
                                uri: movieClient.getImageUrl(
                                  actor.profile_path,
                                  'w342'
                                ),
                              }}
                              style={styles.castImage}
                            />
                          ) : (
                            <View style={styles.castPlaceholder}>
                              <Text style={styles.castPlaceholderText}>
                                No Image
                              </Text>
                            </View>
                          )}
                        </View>
                        <Text style={styles.castName} numberOfLines={1}>
                          {actor.name}
                        </Text>
                        <Text style={styles.castCharacter} numberOfLines={1}>
                          {actor.character}
                        </Text>
                      </View>
                    ))}
                  </View>
                </ScrollView>
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
);

MovieDetail.displayName = 'MovieDetail';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  backdrop: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 12,
  },
  backText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#222',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 16,
    color: '#FFB800',
  },
  releaseDate: {
    fontSize: 14,
    color: '#777',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 24,
    marginBottom: 12,
    color: '#222',
  },
  overview: {
    fontSize: 14,
    lineHeight: 22,
    color: '#555',
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    marginHorizontal: -8,
  },
  detailItem: {
    width: '50%',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
  },
  genres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  genreTag: {
    backgroundColor: '#E8F4F8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    margin: 6,
  },
  genreText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0066CC',
  },
  castContainer: {
    flexDirection: 'row',
    paddingRight: 16,
  },
  castMember: {
    width: 100,
    marginRight: 12,
  },
  castImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
    backgroundColor: '#e0e0e0',
  },
  castImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  castPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  castPlaceholderText: {
    fontSize: 10,
    color: '#999',
  },
  castName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#222',
    marginBottom: 2,
  },
  castCharacter: {
    fontSize: 11,
    color: '#777',
  },
});
