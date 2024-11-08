import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { VehicleRequest, VehicleBrandResponse } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private loginUrl = 'http://localhost:8080/temira/vehicle';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) { }

  getVehicles(): Observable<VehicleBrandResponse[]> {
    return this.http.get<VehicleBrandResponse[]>(`${this.loginUrl}/all`);
  }

  getVehicle(id: string): Observable<VehicleBrandResponse> {
    return this.http.get<VehicleBrandResponse>(`${this.loginUrl}/${id}`);
  }

  createVehicle(vehicle: VehicleRequest): Observable<any> {
    return this.http.post<any>(`${this.loginUrl}/add`, vehicle);
  }

  updateVehicle(id: string, vehicle: VehicleRequest): Observable<any> {
    return this.http.put<any>(`${this.loginUrl}/${id}`, vehicle);
  }

  deleteVehicle(id: string): Observable<any> {
    return this.http.delete<any>(`${this.loginUrl}/${id}`);
  }
}
