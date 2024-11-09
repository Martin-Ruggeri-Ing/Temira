import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { DriverRequest, DriverResponse } from '../models/driver.model';
import { environment } from '../environments/environment';
import { HandleErrorService } from './handle-error.service';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private loginUrl = environment.apiUrl+'/driver';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private handleErrorService: HandleErrorService) { }

  getDrivers(): Observable<DriverResponse[]> {
    return this.http.get<DriverResponse[]>(`${this.loginUrl}/all`).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  getDriver(id: string): Observable<DriverResponse> {
    return this.http.get<DriverResponse>(`${this.loginUrl}/${id}`).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  createDriver(driver: DriverRequest): Observable<any> {
    return this.http.post<any>(`${this.loginUrl}/add`, driver).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  updateDriver(id: string, driver: DriverRequest): Observable<any> {
    return this.http.put<any>(`${this.loginUrl}/${id}`, driver).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  deleteDriver(id: string): Observable<any> {
    return this.http.delete<any>(`${this.loginUrl}/${id}`).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }
}
