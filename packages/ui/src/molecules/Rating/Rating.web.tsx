import * as React from 'react';

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
    gap: '8px',
  },
  rating: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#FFB800',
  },
  votes: {
    fontSize: '14px',
    color: '#666',
  },
};
