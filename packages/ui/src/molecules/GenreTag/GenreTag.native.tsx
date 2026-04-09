import * as React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import {
  COMPONENT_STYLES,
  SPACING,
  BORDER_RADIUS,
  COLORS,
} from '../../shared/constants';

export interface GenreTagProps {
  name: string;
  onClick?: () => void;
}

/**
 * GenreTag - Native
 * Displays genre as a tag for React Native
 */
export function GenreTag({ name, onClick }: GenreTagProps) {
  return (
    <Pressable style={styles.tag} onPress={onClick}>
      <Text style={styles.text}>{name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tag: {
    backgroundColor: COMPONENT_STYLES.tag.backgroundColor,
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.SM,
    borderRadius: BORDER_RADIUS.FULL,
    marginRight: SPACING.SM,
    marginBottom: SPACING.SM,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
  },
  text: {
    color: COMPONENT_STYLES.tag.color,
    fontSize: COMPONENT_STYLES.tag.fontSize,
    fontWeight: COMPONENT_STYLES.tag.fontWeight,
  },
});
