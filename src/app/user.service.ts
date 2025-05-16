import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { restendpoint } from './endpoint/rest.endpoit';

export interface User{
  email: string,
  password: string,
}
export interface loginForm {
  email: string,
  password: string,
}

export interface registerForm {
  email: string | undefined,
  password: string | undefined,
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {   }

   signIn(user: registerForm): Observable<any> {
    return this.http.post(`${restendpoint.base}${restendpoint.auth.register}`, user);
   }

   login(user: loginForm): Observable<any> {
    //https://192.168.1.86:3033/usuario/login
    
    return this.http.post(`${restendpoint.base}${restendpoint.auth.login}`, user)
   }
   logout(): Observable<any> {
    return this.http.post(`${restendpoint.base}${restendpoint.auth.logout}`,{});
   }
}
