import { signalStore, withState, withMethods, patchState, withHooks } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { AuthState, authInitialState, initialUserValue } from './auth.model';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { exhaustMap, pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { LoginUser, NewUser, User } from '@realworld/core/api-types';
import { setLoaded, setLoading, withCallState } from '@realworld/core/data-access';
import { FormErrorsStore } from '@realworld/core/forms';
import { APP_ROUTER_SERVICE } from '@realworld/core/http-client';
import { AUTH_STORAGE_SERVICE } from './services/auth-storage.service';

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<AuthState>(authInitialState),
  withMethods(
    (
      store,
      formErrorsStore = inject(FormErrorsStore),
      authService = inject(AuthService),
      router = inject(APP_ROUTER_SERVICE),
      storageService = inject(AUTH_STORAGE_SERVICE),
    ) => ({
      /** Load auth state from persistent storage */
      loadFromStorage: () => {
        const stored = storageService.load();
        if (stored) {
          console.log('[AuthStore] loadFromStorage: Restoring saved auth state for:', stored.user?.username);
          patchState(store, { user: stored.user, loggedIn: stored.loggedIn, ...setLoaded('getUser') });
        }
      },
      getUser: rxMethod<void>(
        pipe(
          tap(() => {
            console.log('[AuthStore] getUser: Starting to fetch current user...');
            patchState(store, { loggedIn: false, ...setLoading('getUser') });
          }),
          switchMap(() =>
            authService.user().pipe(
              tapResponse({
                next: ({ user }) => {
                  console.log('[AuthStore] getUser: Success - User:', user?.username, 'Email:', user?.email);
                  patchState(store, { user, loggedIn: true, ...setLoaded('getUser') });
                  storageService.save({ user, loggedIn: true });
                },
                error: (error: any) => {
                  console.log('[AuthStore] getUser: Error -', error);
                  patchState(store, { user: initialUserValue, loggedIn: false, ...setLoaded('getUser') });
                  // Clear stored auth on 401 - session is invalid
                  if (error?.status === 401) {
                    console.log('[AuthStore] getUser: Clearing invalid stored auth data');
                    storageService.clear();
                  }
                },
              }),
            ),
          ),
        ),
      ),
      login: rxMethod<LoginUser>(
        pipe(
          tap((credentials) => console.log('[AuthStore] login: Attempting login for:', credentials.email)),
          exhaustMap((credentials) =>
            authService.login(credentials).pipe(
              tapResponse({
                next: ({ user }) => {
                  console.log('[AuthStore] login: Success - User:', user?.username);
                  patchState(store, { user, loggedIn: true });
                  storageService.save({ user, loggedIn: true });
                  console.log('[AuthStore] login: Navigating to home...');
                  router.navigateByUrl('/', { clearHistory: true });
                },
                error: ({ error }) => {
                  console.log('[AuthStore] login: Error -', error);
                  formErrorsStore.setErrors(error.errors);
                },
              }),
            ),
          ),
        ),
      ),
      register: rxMethod<NewUser>(
        pipe(
          exhaustMap((newUserData) =>
            authService.register(newUserData).pipe(
              tapResponse({
                next: (user) => {
                  patchState(store, { user, loggedIn: true });
                  storageService.save({ user, loggedIn: true });
                  router.navigateByUrl('/', { clearHistory: true });
                },
                error: ({ error }) => formErrorsStore.setErrors(error.errors),
              }),
            ),
          ),
        ),
      ),
      updateUser: rxMethod<User>(
        pipe(
          exhaustMap((user) =>
            authService.update(user).pipe(
              tapResponse({
                next: ({ user }) => {
                  patchState(store, { user });
                  storageService.save({ user, loggedIn: true });
                  router.navigateByUrl(`/profile/${user.username}`);
                },
                error: ({ error }) => formErrorsStore.setErrors(error.errors),
              }),
            ),
          ),
        ),
      ),
      logout: rxMethod<void>(
        pipe(
          exhaustMap(() =>
            authService.logout().pipe(
              tapResponse({
                next: () => {
                  patchState(store, { user: initialUserValue, loggedIn: false });
                  storageService.clear();
                  router.navigateByUrl('/login', { clearHistory: true });
                },
                error: ({ error }) => formErrorsStore.setErrors(error.errors),
              }),
            ),
          ),
        ),
      ),
    }),
  ),
  withCallState({ collection: 'getUser' }),
  withHooks({
    onInit(store) {
      console.log('[AuthStore] onInit: Loading auth state from storage...');
      store.loadFromStorage();
    },
  }),
);
