/**
 * Storage utilities for Native (AsyncStorage)
 */

// @ts-ignore - AsyncStorage types are optional in store package
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface StorageAPI {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
  clear(): Promise<void>;
}

export const getStorage = async (): Promise<StorageAPI> => {
  return AsyncStorage;
};

function createNullStorage(): StorageAPI {
  return {
    async getItem() { return null; },
    async setItem() {},
    async removeItem() {},
    async clear() {},
  };
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
