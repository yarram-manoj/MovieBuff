import React from 'react';
import styles from './WatchlistButton.web.module.css';

export interface WatchlistButtonProps {
  isInWatchlist: boolean;
  onPress?: () => void;
}

export const WatchlistButton: React.FC<WatchlistButtonProps> = ({
  isInWatchlist,
  onPress,
}) => {
  return (
    <button
      className={`${styles.button} ${
        isInWatchlist ? styles.inWatchlist : styles.notInWatchlist
      }`}
      onClick={onPress || (() => {})}
    >
      {isInWatchlist ? '★ In Watchlist' : '☆ Add to Watchlist'}
    </button>
  );
};
