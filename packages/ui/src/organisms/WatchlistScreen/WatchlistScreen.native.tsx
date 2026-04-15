import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { Movie } from '@repo/api';
import { i18n } from '../../shared/i18n';
import { MovieCard } from '../MovieCard/MovieCard.native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../shared/constants';

export interface WatchlistScreenProps {
  movies: Movie[];
  onMoviePress: (movieId: number) => void;
  onBack?: () => void;
  loading?: boolean;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.TEXT_LIGHT,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.XL - 4,
  },
  emptyText: {
    fontSize: TYPOGRAPHY.FONT_SIZE.LG,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
  },
  listContent: {
    padding: SPACING.MD,
    paddingBottom: SPACING.XL,
  },
  header: {
    fontSize: TYPOGRAPHY.FONT_SIZE['2XL'],
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.BOLD,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.LG,
  },
  backButton: {
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.MD,
    marginBottom: SPACING.LG,
  },
  backText: {
    fontSize: TYPOGRAPHY.FONT_SIZE.BASE,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.SEMIBOLD,
    color: COLORS.INFO,
  },
});

export const WatchlistScreen: React.FC<WatchlistScreenProps> = ({
  movies,
  onMoviePress,
  onBack,
}) => {
  if (movies.length === 0) {
    return (
      <View style={styles.container}>
        {onBack && (
          <Pressable onPress={onBack} style={styles.backButton}>
            <Text style={styles.backText}>← {i18n.common.back}</Text>
          </Pressable>
        )}
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{i18n.watchlist.empty}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <MovieCard movie={item} onPress={() => onMoviePress(item.id)} />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', gap: 12 }}
        scrollIndicatorInsets={{ right: 1 }}
      />
    </View>
  );
};
