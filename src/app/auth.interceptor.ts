import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthResponse, AuthService } from './auth.service';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
/*
  // Inject the current `AuthService` and use it to get an authentication token:
  const authService = inject(AuthService)
  const token = authService.getToken() || "";

    //if (token) {
      // Clone the request to add the authentication header.
      const newReq = req.clone({
        headers: req.headers.append('X-Authentication-Token', token),
      });
      
   // }
    return next(newReq);
    
*/

  const authService = inject(AuthService)
  const token = authService.getToken() || "";

    if (token) {
      req = addToken(req, token);
    }

    return next(req).pipe(
      catchError((error) => {
        if (error.status === 401 && authService.getRefreshToken()) {
          return handle401Error(req, next);
        }
        return throwError(() => error);
      })
    );
    

  
};
export function addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function handle401Error(request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
  const authService = inject(AuthService)
  return authService.refreshToken().pipe(
    switchMap((response: AuthResponse) => {
      return next(addToken(request, response.token));
    }),
    catchError((err) => {
      authService.logout();
      // Puedes redirigir al usuario a la página de inicio de sesión aquí
      window.location.href = '/login';
      return throwError(() => err);
    })
  );
}