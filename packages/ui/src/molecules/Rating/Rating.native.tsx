import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COMPONENT_STYLES, SPACING, TYPOGRAPHY } from '../../shared/constants';

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
    gap: SPACING.MD,
  },
  rating: {
    fontSize: COMPONENT_STYLES.rating.fontSize,
    fontWeight: COMPONENT_STYLES.rating.fontWeight,
    color: COMPONENT_STYLES.rating.color,
  },
  votes: {
    fontSize: TYPOGRAPHY.FONT_SIZE.BASE,
    color: COMPONENT_STYLES.ratingVotes.color,
  },
});
