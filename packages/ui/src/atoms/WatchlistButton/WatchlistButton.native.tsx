import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { i18n } from '../../shared/i18n';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '../../shared/constants';

export interface WatchlistButtonProps {
  isInWatchlist: boolean;
  onPress?: () => void;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.SM,
    borderRadius: BORDER_RADIUS.MD,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inWatchlist: {
    backgroundColor: COLORS.RATING,
  },
  notInWatchlist: {
    backgroundColor: COLORS.SECONDARY,
  },
  text: {
    fontSize: TYPOGRAPHY.FONT_SIZE.BASE,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.SEMIBOLD,
  },
  textActive: {
    color: COLORS.TEXT_PRIMARY,
  },
  textInactive: {
    color: COLORS.TEXT_SECONDARY,
  },
});

const WatchlistButtonComponent = ({
  isInWatchlist,
  onPress,
}: WatchlistButtonProps) => {
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
        {isInWatchlist ? i18n.watchlist.addedButton : i18n.watchlist.addButton}
      </Text>
    </TouchableOpacity>
  );
};

WatchlistButtonComponent.displayName = 'WatchlistButton';

export const WatchlistButton = React.memo<WatchlistButtonProps>(
  WatchlistButtonComponent
);
