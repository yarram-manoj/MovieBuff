import * as React from 'react';
import { COMPONENT_STYLES, TYPOGRAPHY, SPACING } from '../../shared/constants';
import { Badge } from '../../atoms/Badge/Badge.web';

export interface RatingProps {
  rating: number;
  votesCount?: number;
}

/**
 * Rating - Web
 * Displays movie rating with stars using Badge component
 */
export function Rating({ rating, votesCount }: RatingProps) {
  return (
    <div style={styles.container}>
      <Badge variant="success" size="md">
        ★ {rating.toFixed(1)}
      </Badge>
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
  votes: {
    fontSize: `${TYPOGRAPHY.FONT_SIZE.BASE}px`,
    color: COMPONENT_STYLES.ratingVotes.color,
  },
};
