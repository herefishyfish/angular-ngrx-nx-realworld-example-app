import { Injectable, InjectionToken, inject } from '@angular/core';
import { User } from '@realworld/core/api-types';

const AUTH_STORAGE_KEY = 'realworld_auth';

export interface AuthStorageData {
  user: User;
  loggedIn: boolean;
}

export interface AuthStorageService {
  save(data: AuthStorageData): void;
  load(): AuthStorageData | null;
  clear(): void;
}

export const AUTH_STORAGE_SERVICE = new InjectionToken<AuthStorageService>('AuthStorageService');

/**
 * Web implementation using localStorage
 */
@Injectable({ providedIn: 'root' })
export class WebAuthStorageService implements AuthStorageService {
  save(data: AuthStorageData): void {
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
      console.log('[WebAuthStorageService] Saved auth data to localStorage');
    } catch (e) {
      console.error('[WebAuthStorageService] Failed to save auth data:', e);
    }
  }

  load(): AuthStorageData | null {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored) as AuthStorageData;
        console.log('[WebAuthStorageService] Loaded auth data from localStorage:', data.user?.username);
        return data;
      }
    } catch (e) {
      console.error('[WebAuthStorageService] Failed to load auth data:', e);
    }
    return null;
  }

  clear(): void {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      console.log('[WebAuthStorageService] Cleared auth data from localStorage');
    } catch (e) {
      console.error('[WebAuthStorageService] Failed to clear auth data:', e);
    }
  }
}

/**
 * Default provider for web - uses localStorage
 */
export const provideWebAuthStorage = () => ({
  provide: AUTH_STORAGE_SERVICE,
  useClass: WebAuthStorageService,
});
