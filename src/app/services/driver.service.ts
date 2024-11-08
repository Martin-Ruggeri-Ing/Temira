import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Driver } from '../models/driver.model';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private loginUrl = 'http://localhost:8080/temira/driver';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) { }

  getDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${this.loginUrl}/all`);
  }

  getDriver(id: string): Observable<Driver> {
    return this.http.get<Driver>(`${this.loginUrl}/${id}`);
  }

  createDriver(driver: Driver): Observable<any> {
    return this.http.post<any>(`${this.loginUrl}/add`, driver);
  }

  updateDriver(id: string, driver: Driver): Observable<any> {
    return this.http.put<any>(`${this.loginUrl}/${id}`, driver);
  }

  deleteDriver(id: string): Observable<any> {
    return this.http.delete<any>(`${this.loginUrl}/${id}`);
  }
}
