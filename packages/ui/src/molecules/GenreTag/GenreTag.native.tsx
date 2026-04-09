import * as React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

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
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  text: {
    color: '#666',
    fontSize: 13,
    fontWeight: '600',
  },
});
