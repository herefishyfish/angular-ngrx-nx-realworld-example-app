import { Injectable } from '@angular/core';
import { ApplicationSettings } from '@nativescript/core';
import { AuthStorageService, AuthStorageData } from '@realworld/auth/data-access';

const AUTH_STORAGE_KEY = 'realworld_auth';

/**
 * NativeScript implementation using ApplicationSettings
 */
@Injectable()
export class NativeScriptAuthStorageService implements AuthStorageService {
  save(data: AuthStorageData): void {
    try {
      ApplicationSettings.setString(AUTH_STORAGE_KEY, JSON.stringify(data));
      console.log('[NativeScriptAuthStorageService] Saved auth data to ApplicationSettings');
    } catch (e) {
      console.error('[NativeScriptAuthStorageService] Failed to save auth data:', e);
    }
  }

  load(): AuthStorageData | null {
    try {
      const stored = ApplicationSettings.getString(AUTH_STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored) as AuthStorageData;
        console.log('[NativeScriptAuthStorageService] Loaded auth data from ApplicationSettings:', data.user?.username);
        return data;
      }
    } catch (e) {
      console.error('[NativeScriptAuthStorageService] Failed to load auth data:', e);
    }
    return null;
  }

  clear(): void {
    try {
      ApplicationSettings.remove(AUTH_STORAGE_KEY);
      console.log('[NativeScriptAuthStorageService] Cleared auth data from ApplicationSettings');
    } catch (e) {
      console.error('[NativeScriptAuthStorageService] Failed to clear auth data:', e);
    }
  }
}
