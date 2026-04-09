"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { MovieCard } from "@repo/ui";
import {
  fetchMovies,
  searchMovies,
  clearSelectedMovie,
} from "@repo/store";
import type { AppDispatch, RootState } from "@repo/store";
import styles from "../styles/movies.module.css";

export default function MoviesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { movies, loading, error, totalPages, currentPage, category } =
    useSelector((state: RootState) => state.movies);

  const [selectedCategory, setSelectedCategory] = useState<
    "popular" | "now_playing" | "upcoming" | "top_rated"
  >("popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  // Load movies on component mount and when category changes
  useEffect(() => {
    if (searchQuery.trim()) {
      dispatch(
        searchMovies({ query: searchQuery, page })
      );
    } else {
      dispatch(fetchMovies({ category: selectedCategory, page }));
    }
  }, [selectedCategory, page, searchQuery, dispatch]);

  // Scroll to movies grid when page changes
  useEffect(() => {
    if (page > 1) {
      const moviesGrid = document.querySelector(`.${styles.moviesGrid}`);
      if (moviesGrid) {
        setTimeout(() => {
          moviesGrid.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 0);
      }
    }
  }, [page]);

  // Handle search with debounce
  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      setPage(1);
    },
    []
  );

  // Handle movie card click
  const handleMovieClick = useCallback(
    (movieId: number) => {
      router.push(`/movies/${movieId}`);
    },
    [router]
  );

  // Memoize category buttons to prevent unnecessary re-renders
  const categoryButtons = useMemo(
    () => [
      { id: "popular", label: "Popular" },
      { id: "now_playing", label: "Now Playing" },
      { id: "upcoming", label: "Upcoming" },
      { id: "top_rated", label: "Top Rated" },
    ] as const,
    []
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <h1 className={styles.title}>MovieBuff</h1>
          <a href="/watchlist" className={styles.watchlistLink}>
            ★ My Watchlist
          </a>
        </div>
        <p className={styles.subtitle}>Discover Movies from Around the World</p>
      </header>

      {/* Search Bar */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={handleSearch}
          className={styles.searchInput}
        />
      </div>

      {/* Category Filters */}
      {!searchQuery && (
        <div className={styles.categoryContainer}>
          {categoryButtons.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.categoryButton} ${
                selectedCategory === cat.id ? styles.active : ""
              }`}
              onClick={() => {
                setSelectedCategory(cat.id);
                setPage(1);
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className={styles.errorContainer}>
          <p className={styles.error}>{error}</p>
          <button
            onClick={() => setPage(1)}
            className={styles.retryButton}
          >
            Retry
          </button>
        </div>
      )}

      {/* Movies Grid */}
      <div className={styles.content}>
        {loading && movies.length === 0 ? (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner} />
            <p>Loading movies...</p>
          </div>
        ) : movies.length > 0 ? (
          <>
            <div className={styles.moviesGrid}>
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className={styles.movieCardWrapper}
                  onClick={() => handleMovieClick(movie.id)}
                >
                  <MovieCard
                    movie={movie}
                    isLoading={loading}
                    onPress={() => handleMovieClick(movie.id)}
                  />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className={styles.paginationContainer}>
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1 || loading}
                  className={styles.paginationButton}
                >
                  {loading && page > 1 && <div className={styles.paginationLoader} />}
                  Previous
                </button>
                <span className={styles.paginationInfo}>
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages || loading}
                  className={styles.paginationButton}
                >
                  {loading && page < totalPages && <div className={styles.paginationLoader} />}
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className={styles.emptyContainer}>
            <p>No movies found. Try adjusting your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
