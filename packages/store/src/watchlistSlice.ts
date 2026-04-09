import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '@repo/api';
import { saveJSON, loadJSON } from './storage';

export interface WatchlistState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

const initialState: WatchlistState = {
  movies: [],
  loading: false,
  error: null,
};

const WATCHLIST_STORAGE_KEY = 'moviebuff_watchlist';

/**
 * Load watchlist from persistent storage
 */
export const loadWatchlist = createAsyncThunk(
  'watchlist/loadWatchlist',
  async (_, { rejectWithValue }) => {
    try {
      const watchlist = await loadJSON<Movie[]>(WATCHLIST_STORAGE_KEY);
      return watchlist || [];
    } catch (error) {
      return rejectWithValue('Failed to load watchlist');
    }
  }
);

/**
 * Save watchlist to persistent storage
 */
export const saveWatchlistToStorage = createAsyncThunk(
  'watchlist/saveToStorage',
  async (movies: Movie[], { rejectWithValue }) => {
    try {
      await saveJSON(WATCHLIST_STORAGE_KEY, movies);
      return movies;
    } catch (error) {
      return rejectWithValue('Failed to save watchlist');
    }
  }
);

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    /**
     * Add movie to watchlist (in-memory)
     */
    addToWatchlist: (state, action: PayloadAction<Movie>) => {
      const exists = state.movies.some((m) => m.id === action.payload.id);
      if (!exists) {
        state.movies.push(action.payload);
        state.error = null;
      }
    },

    /**
     * Remove movie from watchlist (in-memory)
     */
    removeFromWatchlist: (state, action: PayloadAction<number>) => {
      state.movies = state.movies.filter((m) => m.id !== action.payload);
      state.error = null;
    },

    /**
     * Clear entire watchlist (in-memory)
     */
    clearWatchlist: (state) => {
      state.movies = [];
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Load from storage
      .addCase(loadWatchlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadWatchlist.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(loadWatchlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Save to storage
      .addCase(saveWatchlistToStorage.pending, (state) => {
        state.error = null;
      })
      .addCase(saveWatchlistToStorage.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(saveWatchlistToStorage.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { addToWatchlist, removeFromWatchlist, clearWatchlist } =
  watchlistSlice.actions;

export default watchlistSlice.reducer;
