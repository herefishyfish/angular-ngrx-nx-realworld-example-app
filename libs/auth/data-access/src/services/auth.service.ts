import { ApiService } from '@realworld/core/http-client';
import { User, UserResponse } from '@realworld/core/api-types';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginUser, LoginUserRequest, NewUserRequest, NewUser } from '@realworld/core/api-types';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiService = inject(ApiService);

  user(): Observable<UserResponse> {
    console.log('[AuthService] user: Fetching current user from /user');
    return this.apiService.get<UserResponse>('/user').pipe(
      tap({
        next: (response) => console.log('[AuthService] user: Response received', response),
        error: (err) => console.log('[AuthService] user: Error', err.status, err.message),
      }),
    );
  }

  update(user: User): Observable<UserResponse> {
    return this.apiService.put('/user', { user });
  }

  login(credentials: LoginUser): Observable<UserResponse> {
    console.log('[AuthService] login: Posting to /users/login');
    return this.apiService.post<UserResponse, LoginUserRequest>('/users/login', { user: credentials }).pipe(
      tap({
        next: (response) => console.log('[AuthService] login: Response received', response),
        error: (err) => console.log('[AuthService] login: Error', err.status, err.message),
      }),
    );
  }

  logout(): Observable<{ message: string }> {
    return this.apiService.post<{ message: string }, void>('/users/logout');
  }

  register(credentials: NewUser): Observable<User> {
    return this.apiService.post<User, NewUserRequest>('/users', { user: credentials });
  }
}
