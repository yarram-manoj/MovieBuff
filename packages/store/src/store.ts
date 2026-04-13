import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './moviesSlice';
import watchlistReducer from './watchlistSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    watchlist: watchlistReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
