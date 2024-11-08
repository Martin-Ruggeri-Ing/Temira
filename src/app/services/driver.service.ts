import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { DriverRequest, DriverResponse } from '../models/driver.model';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private loginUrl = 'http://localhost:8080/temira/driver';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) { }

  getDrivers(): Observable<DriverResponse[]> {
    return this.http.get<DriverResponse[]>(`${this.loginUrl}/all`);
  }

  getDriver(id: string): Observable<DriverResponse> {
    return this.http.get<DriverResponse>(`${this.loginUrl}/${id}`);
  }

  createDriver(driver: DriverRequest): Observable<any> {
    return this.http.post<any>(`${this.loginUrl}/add`, driver);
  }

  updateDriver(id: string, driver: DriverRequest): Observable<any> {
    return this.http.put<any>(`${this.loginUrl}/${id}`, driver);
  }

  deleteDriver(id: string): Observable<any> {
    return this.http.delete<any>(`${this.loginUrl}/${id}`);
  }
}
