import * as React from 'react';
import {
  COMPONENT_STYLES,
  SPACING,
  BORDER_RADIUS,
} from '../../shared/constants';

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
    backgroundColor: COMPONENT_STYLES.tag.backgroundColor,
    color: COMPONENT_STYLES.tag.color,
    padding: `${SPACING.SM}px ${SPACING.MD}px`,
    borderRadius: `${BORDER_RADIUS.FULL}px`,
    fontSize: `${COMPONENT_STYLES.tag.fontSize}px`,
    fontWeight: COMPONENT_STYLES.tag.fontWeight,
    border: COMPONENT_STYLES.tag.border,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  } as React.CSSProperties,
};
