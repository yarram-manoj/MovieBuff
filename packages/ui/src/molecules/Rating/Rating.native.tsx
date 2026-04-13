import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COMPONENT_STYLES, SPACING, TYPOGRAPHY, COLORS } from '../../shared/constants';

export interface RatingProps {
  rating: number;
  votesCount?: number;
}

/**
 * Rating - Native
 * Displays movie rating with stars
 */
export const Rating = React.memo(function Rating({ rating, votesCount }: RatingProps) {
  return (
    <View style={styles.container}>
      <View style={styles.ratingBadge}>
        <Text style={styles.ratingText}>★ {rating.toFixed(1)}</Text>
      </View>
      {votesCount && (
        <Text style={styles.votes}>({(votesCount / 1000).toFixed(1)}K)</Text>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.MD,
  },
  ratingBadge: {
    backgroundColor: COLORS.SUCCESS,
    paddingHorizontal: SPACING.SM * 2,
    paddingVertical: SPACING.XS,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingText: {
    color: '#fff',
    fontSize: TYPOGRAPHY.FONT_SIZE.SM,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.SEMIBOLD,
  },
  votes: {
    fontSize: TYPOGRAPHY.FONT_SIZE.BASE,
    color: COMPONENT_STYLES.ratingVotes.color,
  },
});
