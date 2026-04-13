import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { Movie } from '@repo/api';
import { i18n } from '../../shared/i18n';
import { MovieCard } from '../MovieCard/MovieCard.native';

export interface WatchlistScreenProps {
  movies: Movie[];
  onMoviePress: (movieId: number) => void;
  onBack?: () => void;
  loading?: boolean;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  listContent: {
    padding: 12,
    paddingBottom: 24,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  backButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  backText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
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
