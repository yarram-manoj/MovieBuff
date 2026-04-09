import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface RatingProps {
  rating: number;
  votesCount?: number;
}

/**
 * Rating - Native
 * Displays movie rating with stars for React Native
 */
export function Rating({ rating, votesCount }: RatingProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.rating}>★ {rating.toFixed(1)}</Text>
      {votesCount && (
        <Text style={styles.votes}>({(votesCount / 1000).toFixed(1)}K)</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rating: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFB800',
  },
  votes: {
    fontSize: 14,
    color: '#666',
  },
});
