import React from 'react';
import { Movie } from '@repo/api';

/**
 * Shared Types for UI Components
 */

export interface ButtonProps {
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface MovieCardProps {
  movie: Movie;
  onPress?: (movie: Movie) => void;
  isLoading?: boolean;
}

export interface MovieDetailProps {
  movie: Movie;
  onBack?: () => void;
  isLoading?: boolean;
}

export interface RatingProps {
  rating: number;
  votesCount?: number;
}

export interface GenreTagProps {
  name: string;
  onClick?: () => void;
}

export interface CastMemberProps {
  id: number;
  name: string;
  character: string;
  profilePath?: string | null;
}
