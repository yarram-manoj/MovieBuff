import axios, { AxiosInstance } from 'axios';
import {
  MovieDetails,
  MovieListResponse,
  GenreListResponse,
  MovieCategory,
  ApiError,
} from './types';
import { loadApiConfig, type ApiConfig } from './config';
import { RequestCache } from './cache';

export class TheMovieDBClient {
  private apiKey: string;
  private baseUrl: string;
  private imageBaseUrl: string;
  private client: AxiosInstance;
  private cache = new RequestCache();
  private pendingRequests = new Map<string, Promise<any>>();

  constructor(apiKey: string, config?: Partial<ApiConfig>) {
    const apiConfig = { ...loadApiConfig(), ...config };

    this.apiKey = apiKey || apiConfig.apiKey;
    this.baseUrl = apiConfig.baseUrl || 'https://api.themoviedb.org/3';
    this.imageBaseUrl = apiConfig.imageBaseUrl || 'https://image.tmdb.org/t/p';

    this.client = axios.create({
      baseURL: this.baseUrl,
      params: {
        api_key: this.apiKey,
      },
    });
  }

  /**
   * Get popular movies
   */
  async getPopularMovies(page: number = 1): Promise<MovieListResponse> {
    try {
      const response = await this.client.get<MovieListResponse>(
        '/movie/popular',
        {
          params: { page },
        }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get now playing movies
   */
  async getNowPlayingMovies(page: number = 1): Promise<MovieListResponse> {
    try {
      const response = await this.client.get<MovieListResponse>(
        '/movie/now_playing',
        {
          params: { page },
        }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get upcoming movies
   */
  async getUpcomingMovies(page: number = 1): Promise<MovieListResponse> {
    try {
      const response = await this.client.get<MovieListResponse>(
        '/movie/upcoming',
        {
          params: { page },
        }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get top rated movies
   */
  async getTopRatedMovies(page: number = 1): Promise<MovieListResponse> {
    try {
      const response = await this.client.get<MovieListResponse>(
        '/movie/top_rated',
        {
          params: { page },
        }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get movies by category
   * Cached for 5 minutes to reduce API calls
   * Deduplicates concurrent identical requests
   */
  async getMoviesByCategory(
    category: MovieCategory,
    page: number = 1
  ): Promise<MovieListResponse> {
    const cacheKey = `movies_${category}_${page}`;
    
    // Check cache first
    const cached = this.cache.get<MovieListResponse>(cacheKey);
    if (cached) {
      return cached;
    }
    
    // Check if there's already a pending request for this
    const pending = this.pendingRequests.get(cacheKey);
    if (pending) return pending;
    
    try {
      const request = this.client.get<MovieListResponse>(
        `/movie/${category}`,
        { params: { page } }
      ).then(response => {
        // Cache for 5 minutes
        this.cache.set(cacheKey, response.data, 5 * 60 * 1000);
        this.pendingRequests.delete(cacheKey);
        return response.data;
      }).catch(error => {
        this.pendingRequests.delete(cacheKey);
        throw error;
      });
      
      this.pendingRequests.set(cacheKey, request);
      return await request;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get movie details with credits
   * Cached for 10 minutes to reduce API calls
   * Deduplicates concurrent identical requests
   */
  async getMovieDetails(movieId: number): Promise<MovieDetails> {
    const cacheKey = `movie_${movieId}`;
    
    // Check cache first
    const cached = this.cache.get<MovieDetails>(cacheKey);
    if (cached) return cached;
    
    // Check if there's already a pending request for this
    const pending = this.pendingRequests.get(cacheKey);
    if (pending) return pending;
    
    try {
      const request = this.client.get<MovieDetails>(
        `/movie/${movieId}`,
        {
          params: {
            append_to_response: 'credits',
          },
        }
      ).then(response => {
        // Cache for 10 minutes
        this.cache.set(cacheKey, response.data, 10 * 60 * 1000);
        this.pendingRequests.delete(cacheKey);
        return response.data;
      }).catch(error => {
        this.pendingRequests.delete(cacheKey);
        throw error;
      });
      
      this.pendingRequests.set(cacheKey, request);
      return await request;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Search movies
   * Cached for 5 minutes to reduce API calls
   * Deduplicates concurrent identical requests
   */
  async searchMovies(
    query: string,
    page: number = 1
  ): Promise<MovieListResponse> {
    const cacheKey = `search_${query}_${page}`;
    
    // Check cache first
    const cached = this.cache.get<MovieListResponse>(cacheKey);
    if (cached) {
      return cached;
    }
    
    // Check if there's already a pending request for this
    const pending = this.pendingRequests.get(cacheKey);
    if (pending) return pending;
    
    try {
      const request = this.client.get<MovieListResponse>(
        '/search/movie',
        {
          params: { query, page },
        }
      ).then(response => {
        // Cache for 5 minutes
        this.cache.set(cacheKey, response.data, 5 * 60 * 1000);
        this.pendingRequests.delete(cacheKey);
        return response.data;
      }).catch(error => {
        this.pendingRequests.delete(cacheKey);
        throw error;
      });
      
      this.pendingRequests.set(cacheKey, request);
      return await request;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get movie genres
   * Cached for 1 hour (genres change infrequently)
   */
  async getGenres(): Promise<GenreListResponse> {
    const cacheKey = 'genres_list';
    
    // Check cache first
    const cached = this.cache.get<GenreListResponse>(cacheKey);
    if (cached) return cached;
    
    try {
      const response =
        await this.client.get<GenreListResponse>('/genre/movie/list');
      
      // Cache for 1 hour
      this.cache.set(cacheKey, response.data, 60 * 60 * 1000);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get poster URL
   */
  getImageUrl(
    path: string | null,
    size: 'w342' | 'w500' | 'w780' | 'original' = 'w342'
  ): string {
    if (!path) {
      return '';
    }
    return `${this.imageBaseUrl}/${size}${path}`;
  }

  /**
   * Get backdrop URL
   */
  getBackdropUrl(
    path: string | null,
    size: 'w780' | 'w1280' | 'original' = 'w780'
  ): string {
    if (!path) {
      return '';
    }
    return `${this.imageBaseUrl}/${size}${path}`;
  }

  /**
   * Handle API errors
   */
  private handleError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
      const apiError: ApiError = error.response?.data || {};
      const message =
        apiError.status_message ||
        apiError.message ||
        error.message ||
        'Unknown error occurred';
      return new Error(message);
    }
    return error instanceof Error ? error : new Error('Unknown error occurred');
  }
}

// Export factory function
export function createMovieClient(apiKey: string): TheMovieDBClient {
  return new TheMovieDBClient(apiKey);
}

// Global singleton instance cache
const clientInstances = new Map<string, TheMovieDBClient>();

/**
 * Get or create a singleton TheMovieDBClient instance per API key
 * Reuses the same client instance to preserve cache across requests
 */
export function getMovieClient(apiKey: string): TheMovieDBClient {
  if (!clientInstances.has(apiKey)) {
    clientInstances.set(apiKey, new TheMovieDBClient(apiKey));
  }
  return clientInstances.get(apiKey)!;
}
