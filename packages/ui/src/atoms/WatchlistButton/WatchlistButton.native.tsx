import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Pressable } from 'react-native';

export interface WatchlistButtonProps {
  isInWatchlist: boolean;
  onPress?: () => void;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inWatchlist: {
    backgroundColor: '#fbbf24',
  },
  notInWatchlist: {
    backgroundColor: '#e5e7eb',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
  textActive: {
    color: '#1f2937',
  },
  textInactive: {
    color: '#6b7280',
  },
});

export const WatchlistButton = React.memo<WatchlistButtonProps>(({
  isInWatchlist,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isInWatchlist ? styles.inWatchlist : styles.notInWatchlist,
      ]}
      onPress={onPress || (() => {})}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.text,
          isInWatchlist ? styles.textActive : styles.textInactive,
        ]}
      >
        {isInWatchlist ? '★ In Watchlist' : '☆ Add to Watchlist'}
      </Text>
    </TouchableOpacity>
  );
});
