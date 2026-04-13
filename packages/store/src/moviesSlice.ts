import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Movie, MovieDetails } from '@repo/api';
import { createMovieClient } from '@repo/api';
import { getApiKey, handleThunkError } from './utils';

export interface MovieState {
  movies: Movie[];
  selectedMovie: MovieDetails | null;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  category: 'popular' | 'now_playing' | 'upcoming' | 'top_rated';
}

const initialState: MovieState = {
  movies: [],
  selectedMovie: null,
  currentPage: 1,
  totalPages: 0,
  loading: false,
  error: null,
  category: 'popular',
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
      const API_KEY = getApiKey();
      const movieClient = createMovieClient(API_KEY);
      const data = await movieClient.getMoviesByCategory(category, page);
      return {
        movies: data.results,
        totalPages: data.total_pages,
        currentPage: page,
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
      const API_KEY = getApiKey();
      const movieClient = createMovieClient(API_KEY);
      const data = await movieClient.searchMovies(query, page);
      return {
        movies: data.results,
        totalPages: data.total_pages,
        currentPage: page,
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
      const movieClient = createMovieClient(API_KEY);
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
        state.movies = action.payload.movies;
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
        state.movies = action.payload.movies;
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
