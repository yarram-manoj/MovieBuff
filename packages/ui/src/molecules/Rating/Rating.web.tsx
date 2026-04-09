import * as React from 'react';
import { COMPONENT_STYLES, TYPOGRAPHY, SPACING } from '../../shared/constants';

export interface RatingProps {
  rating: number;
  votesCount?: number;
}

/**
 * Rating - Web
 * Displays movie rating with stars
 */
export function Rating({ rating, votesCount }: RatingProps) {
  return (
    <div style={styles.container}>
      <span style={styles.rating}>★ {rating.toFixed(1)}</span>
      {votesCount && (
        <span style={styles.votes}>({votesCount.toLocaleString()})</span>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: `${SPACING.MD}px`,
  },
  rating: {
    fontSize: `${COMPONENT_STYLES.rating.fontSize}px`,
    fontWeight: COMPONENT_STYLES.rating.fontWeight,
    color: COMPONENT_STYLES.rating.color,
  },
  votes: {
    fontSize: `${TYPOGRAPHY.FONT_SIZE.BASE}px`,
    color: COMPONENT_STYLES.ratingVotes.color,
  },
};
