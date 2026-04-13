/**
 * Request deduplication - prevents multiple identical API calls
 * from being made simultaneously
 */

type PendingRequest<T> = {
  promise: Promise<T>;
  timestamp: number;
};

const pendingRequests = new Map<string, PendingRequest<any>>();

/**
 * Deduplicate requests - if an identical request is already in flight,
 * return the same promise instead of making a new request
 * @param key - Unique key for the request
 * @param requestFn - Function that makes the actual request
 * @returns The result from the request (either pending or new)
 */
export async function deduplicateRequest<T>(
  key: string,
  requestFn: () => Promise<T>
): Promise<T> {
  // Check if there's already a request in flight
  const existing = pendingRequests.get(key);
  
  if (existing) {
    // If it's recent (within 100ms), return the same promise
    if (Date.now() - existing.timestamp < 100) {
      return existing.promise;
    } else {
      // Remove stale pending request
      pendingRequests.delete(key);
    }
  }

  // Create new request
  const promise = requestFn().finally(() => {
    // Remove from pending when done
    pendingRequests.delete(key);
  });

  pendingRequests.set(key, {
    promise,
    timestamp: Date.now(),
  });

  return promise;
}

/**
 * Clear all pending requests
 */
export function clearPendingRequests(): void {
  pendingRequests.clear();
}

/**
 * Get stats on pending requests
 */
export function getPendingRequestStats(): {
  count: number;
  keys: string[];
} {
  return {
    count: pendingRequests.size,
    keys: Array.from(pendingRequests.keys()),
  };
}
