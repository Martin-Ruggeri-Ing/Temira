import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginRequest } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8080/temira/auth/login';
  private tokenKey = 'authToken';

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(login: LoginRequest): Observable<any> {
    return this.httpClient.post<any>(this.loginUrl, login).pipe(
      tap(response => {
        console.log('AuthService.login', response.token);
        localStorage.setItem(this.tokenKey, response.token);
      })
    );
  }

  public getToken(): string | null {
    if(typeof window !== 'undefined'){
      return localStorage.getItem(this.tokenKey);
    }else {
      return null;
    }
  }


  isAuthenticated(): boolean {
    const token = this.getToken();
    if (token === null) {
      return false;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;

    return Date.now() < exp;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }


}
