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
import {
  CAST_DISPLAY_LIMIT,
  IMAGE_SIZES,
  COLORS,
  SPACING,
  BORDER_RADIUS,
  TYPOGRAPHY,
  DESIGN_TOKENS,
} from '../../shared/constants';
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
    backgroundColor: COLORS.TEXT_LIGHT,
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
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.MD,
  },
  backButton: {
    padding: SPACING.MD,
  },
  backText: {
    fontSize: TYPOGRAPHY.FONT_SIZE.LG,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.SEMIBOLD,
    color: COLORS.INFO,
  },
  content: {
    paddingHorizontal: SPACING.LG,
    paddingBottom: SPACING['2XL'],
  },
  title: {
    fontSize: TYPOGRAPHY.FONT_SIZE['2XL'],
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.BOLD,
    marginBottom: SPACING.MD,
    color: COLORS.TEXT_PRIMARY,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.XL - 4,
  },
  rating: {
    fontSize: TYPOGRAPHY.FONT_SIZE.LG,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.SEMIBOLD,
    marginRight: SPACING.LG,
    color: COLORS.RATING,
  },
  releaseDate: {
    fontSize: TYPOGRAPHY.FONT_SIZE.BASE,
    color: COLORS.TEXT_SECONDARY,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.FONT_SIZE.XL,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.BOLD,
    marginTop: SPACING.XL,
    marginBottom: SPACING.MD,
    color: COLORS.TEXT_PRIMARY,
  },
  overview: {
    fontSize: TYPOGRAPHY.FONT_SIZE.BASE,
    lineHeight: 22,
    color: COLORS.TEXT_SECONDARY,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SPACING.LG,
    marginHorizontal: -8,
  },
  detailItem: {
    width: '50%',
    paddingHorizontal: 8,
    paddingVertical: SPACING.SM,
    borderRadius: BORDER_RADIUS.MD,
    backgroundColor: COLORS.BG_LIGHT,
    marginBottom: SPACING.SM,
  },
  detailLabel: {
    fontSize: TYPOGRAPHY.FONT_SIZE.XS,
    color: COLORS.TEXT_TERTIARY,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: TYPOGRAPHY.FONT_SIZE.BASE,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.SEMIBOLD,
    color: COLORS.TEXT_PRIMARY,
  },
  genres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  genreTag: {
    backgroundColor: DESIGN_TOKENS.color.brand[50],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.LG,
    margin: 6,
  },
  genreText: {
    fontSize: TYPOGRAPHY.FONT_SIZE.XS,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.SEMIBOLD,
    color: COLORS.INFO,
  },
  castContainer: {
    flexDirection: 'row',
    paddingRight: 16,
  },
  castMember: {
    width: 100,
    marginRight: SPACING.MD,
  },
  castImageContainer: {
    width: 100,
    height: 100,
    borderRadius: BORDER_RADIUS.MD,
    overflow: 'hidden',
    marginBottom: SPACING.SM,
    backgroundColor: COLORS.SECONDARY,
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
    backgroundColor: COLORS.SECONDARY,
  },
  castPlaceholderText: {
    fontSize: TYPOGRAPHY.FONT_SIZE.XS - 2,
    color: COLORS.TEXT_TERTIARY,
  },
  castName: {
    fontSize: TYPOGRAPHY.FONT_SIZE.XS,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.SEMIBOLD,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 2,
  },
  castCharacter: {
    fontSize: TYPOGRAPHY.FONT_SIZE.XS - 1,
    color: COLORS.TEXT_SECONDARY,
  },
});
