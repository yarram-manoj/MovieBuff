import React from 'react';
import { i18n } from '../../shared/i18n';
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
      {isInWatchlist ? i18n.watchlist.addedButton : i18n.watchlist.addButton}
    </button>
  );
};
