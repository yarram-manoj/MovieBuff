import * as React from 'react';

export interface GenreTagProps {
  name: string;
  onClick?: () => void;
}

/**
 * GenreTag - Web
 * Displays genre as a clickable tag
 */
export function GenreTag({ name, onClick }: GenreTagProps) {
  return (
    <span onClick={onClick} style={styles.tag}>
      {name}
    </span>
  );
}

const styles = {
  tag: {
    display: 'inline-block',
    backgroundColor: '#f0f0f0',
    color: '#666',
    padding: '6px 12px',
    borderRadius: '16px',
    fontSize: '13px',
    fontWeight: '600',
    border: '1px solid #ddd',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  } as React.CSSProperties,
};
