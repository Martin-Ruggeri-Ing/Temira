import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { VehicleRequest, VehicleBrandResponse } from '../models/vehicle.model';
import { environment } from '../environments/environment';
import { HandleErrorService } from './handle-error.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private loginUrl = environment.apiUrl+'/vehicle';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private handleErrorService: HandleErrorService) { }

  getVehicles(): Observable<VehicleBrandResponse[]> {
    return this.http.get<VehicleBrandResponse[]>(`${this.loginUrl}/all`).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  getVehicle(id: string): Observable<VehicleBrandResponse> {
    return this.http.get<VehicleBrandResponse>(`${this.loginUrl}/${id}`).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  createVehicle(vehicle: VehicleRequest): Observable<any> {
    return this.http.post<any>(`${this.loginUrl}/add`, vehicle).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  updateVehicle(id: string, vehicle: VehicleRequest): Observable<any> {
    return this.http.put<any>(`${this.loginUrl}/${id}`, vehicle).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  deleteVehicle(id: string): Observable<any> {
    return this.http.delete<any>(`${this.loginUrl}/${id}`).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }
}
