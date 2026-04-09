/**
 * Storage utilities for Web (localStorage)
 */

export interface StorageAPI {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
  clear(): Promise<void>;
}

const webStorage: StorageAPI = {
  async getItem(key: string) {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(key);
  },
  async setItem(key: string, value: string) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, value);
  },
  async removeItem(key: string) {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  },
  async clear() {
    if (typeof window === 'undefined') return;
    localStorage.clear();
  },
};

export async function getStorage(): Promise<StorageAPI> {
  return webStorage;
}

export async function saveJSON<T>(key: string, data: T): Promise<void> {
  const storage = await getStorage();
  await storage.setItem(key, JSON.stringify(data));
}

export async function loadJSON<T>(key: string): Promise<T | null> {
  const storage = await getStorage();
  const data = await storage.getItem(key);
  if (!data) return null;
  try {
    return JSON.parse(data) as T;
  } catch {
    return null;
  }
}
