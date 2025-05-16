import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

/*
* Asegúrate de que tu backend implemente los endpoints
* /auth/login, /auth/signup y /auth/refresh y que genere tokens JWT y refresh tokens.
*/
const API_URL = 'https://myapi.com';

export interface AuthResponse {
  token: string;
  refreshToken: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(this.getToken());
  public token$ = this.tokenSubject.asObservable();

  private refreshTokenSubject = new BehaviorSubject<string | null>(this.getRefreshToken());

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(!!this.getToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private refreshingToken = false;
  private refreshTokenSubject$ = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {}

  login(credentials: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_URL}/auth/login`, credentials).pipe(
      tap((response) => {
        this.setToken(response.token);
        this.setRefreshToken(response.refreshToken);
        this.tokenSubject.next(response.token);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  signup(userData: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_URL}/auth/signup`, userData).pipe(
      tap((response) => {
        this.setToken(response.token);
        this.setRefreshToken(response.refreshToken);
        this.tokenSubject.next(response.token);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  logout(): void {
    this.removeToken();
    this.removeRefreshToken();
    this.tokenSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    // Opcional: realizar una petición al backend para invalidar el refresh token
    // return this.http.post(`${API_URL}/auth/logout`, {}).pipe(
    //   tap(() => {
    //     this.removeToken();
    //     this.removeRefreshToken();
    //     this.tokenSubject.next(null);
    //     this.isAuthenticatedSubject.next(false);
    //   })
    // );
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  private setToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  private removeToken(): void {
    localStorage.removeItem('access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  private setRefreshToken(refreshToken: string): void {
    localStorage.setItem('refresh_token', refreshToken);
  }

  private removeRefreshToken(): void {
    localStorage.removeItem('refresh_token');
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (token) {
      return this.jwtHelper.isTokenExpired(token);
    }
    return true;
  }
  refreshToken(): Observable<AuthResponse> {
    if (this.refreshingToken) {
      return this.refreshTokenSubject$.pipe(
        filter((result) => result !== null),
        take(1),
        switchMap(() => this.http.post<AuthResponse>(`${API_URL}/auth/refresh`, { refreshToken: this.getRefreshToken() }))
      );
    } else {
      this.refreshingToken = true;
      this.refreshTokenSubject$.next(null);

      return this.http.post<AuthResponse>(`${API_URL}/auth/refresh`, { refreshToken: this.getRefreshToken() })
      .pipe(
        tap((response) => {
          this.refreshingToken = false;
          this.setToken(response.token);
          this.setRefreshToken(response.refreshToken);
          this.tokenSubject.next(response.token);
          this.refreshTokenSubject$.next(response);
        }),
        catchError((err) => {
          this.refreshingToken = false;
          this.logout(); // O redirigir a la página de login
          return throwError(() => err);
        })
      );
    }
  }
}
