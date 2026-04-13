import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Movie, MovieDetails } from '@repo/api';
import { getMovieClient } from '@repo/api';
import { getApiKey, handleThunkError } from './utils';

export interface MovieState {
  movies: Movie[];
  selectedMovie: MovieDetails | null;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  category: 'popular' | 'now_playing' | 'upcoming' | 'top_rated';
  isAppending: boolean; // Track if we're appending paginated results
}

const initialState: MovieState = {
  movies: [],
  selectedMovie: null,
  currentPage: 1,
  totalPages: 0,
  loading: false,
  error: null,
  category: 'popular',
  isAppending: false,
};

// Async thunks
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (
    {
      category,
      page = 1,
    }: {
      category: 'popular' | 'now_playing' | 'upcoming' | 'top_rated';
      page?: number;
    },
    { rejectWithValue }
  ) => {
    try {
      // Ensure page is a valid number >= 1
      const validPage = Math.max(1, parseInt(String(page), 10) || 1);
      
      const API_KEY = getApiKey();
      const movieClient = getMovieClient(API_KEY);
      const data = await movieClient.getMoviesByCategory(category, validPage);
      return {
        movies: data.results,
        totalPages: data.total_pages,
        currentPage: validPage,
        category,
      };
    } catch (error) {
      if (error instanceof Error && error.message.includes('API key')) {
        return rejectWithValue('API configuration error. Check your environment variables.');
      }
      return rejectWithValue(handleThunkError(error));
    }
  }
);

export const searchMovies = createAsyncThunk(
  'movies/searchMovies',
  async (
    { query, page = 1 }: { query: string; page?: number },
    { rejectWithValue }
  ) => {
    try {
      // Ensure page is a valid number >= 1
      const validPage = Math.max(1, parseInt(String(page), 10) || 1);
      
      const API_KEY = getApiKey();
      const movieClient = getMovieClient(API_KEY);
      const data = await movieClient.searchMovies(query, validPage);
      return {
        movies: data.results,
        totalPages: data.total_pages,
        currentPage: validPage,
      };
    } catch (error) {
      if (error instanceof Error && error.message.includes('API key')) {
        return rejectWithValue('API configuration error. Check your environment variables.');
      }
      return rejectWithValue(handleThunkError(error));
    }
  }
);

export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchMovieDetails',
  async (movieId: number, { rejectWithValue }) => {
    try {
      const API_KEY = getApiKey();
      const movieClient = getMovieClient(API_KEY);
      const movie = await movieClient.getMovieDetails(movieId);
      return movie;
    } catch (error) {
      if (error instanceof Error && error.message.includes('API key')) {
        return rejectWithValue('API configuration error. Check your environment variables.');
      }
      return rejectWithValue(handleThunkError(error));
    }
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
    },
    setCategory: (state, action: PayloadAction<MovieState['category']>) => {
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch movies
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        // For page 1, replace movies. For other pages, append (deduplicate by ID)
        if (action.payload.currentPage === 1) {
          state.movies = action.payload.movies;
          state.isAppending = false;
        } else {
          // Deduplicate by ID before appending
          const existingIds = new Set(state.movies.map((m) => m.id));
          const newMovies = action.payload.movies.filter(
            (m) => !existingIds.has(m.id)
          );
          state.movies = [...state.movies, ...newMovies];
          state.isAppending = true;
        }
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.category = action.payload.category;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Search movies
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        // For page 1, replace movies. For other pages, append (deduplicate by ID)
        if (action.payload.currentPage === 1) {
          state.movies = action.payload.movies;
          state.isAppending = false;
        } else {
          // Deduplicate by ID before appending
          const existingIds = new Set(state.movies.map((m) => m.id));
          const newMovies = action.payload.movies.filter(
            (m) => !existingIds.has(m.id)
          );
          state.movies = [...state.movies, ...newMovies];
          state.isAppending = true;
        }
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch movie details
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMovie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedMovie, setCategory } = movieSlice.actions;
export default movieSlice.reducer;
