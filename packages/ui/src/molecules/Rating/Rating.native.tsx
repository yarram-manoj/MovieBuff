import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COMPONENT_STYLES, SPACING, TYPOGRAPHY } from '../../shared/constants';
import { Badge } from '../../atoms';

export interface RatingProps {
  rating: number;
  votesCount?: number;
}

/**
 * Rating - Native
 * Displays movie rating with stars using Badge component
 */
export function Rating({ rating, votesCount }: RatingProps) {
  return (
    <View style={styles.container}>
      <Badge variant="success" size="md">
        ★ {rating.toFixed(1)}
      </Badge>
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
  votes: {
    fontSize: TYPOGRAPHY.FONT_SIZE.BASE,
    color: COMPONENT_STYLES.ratingVotes.color,
  },
});
