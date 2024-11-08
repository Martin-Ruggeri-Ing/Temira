import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8080/temira/auth/login';
  private tokenKey = 'authToken';

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<any> {
    return this.httpClient.post<any>(this.loginUrl, {username, password}).pipe(
      tap(response => {
        console.log('AuthService.login', response.token);
        localStorage.setItem(this.tokenKey, response.token);
      })
    );
  }

  private getToken(): string | null {
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
