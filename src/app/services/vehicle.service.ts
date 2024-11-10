import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { VehicleRequest, VehicleBrand,  VehicleType, VehicleResponse} from '../models/vehicle.model';
import { environment } from '../environments/environment';
import { HandleErrorService } from './handle-error.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private loginUrl = environment.apiUrl+'/vehicle';
  private loginUrlBrand = environment.apiUrl+'/vehicleBrand';
  private loginUrlType = environment.apiUrl+'/vehicleType';

  constructor(private http: HttpClient, private handleErrorService: HandleErrorService) { }

  getVehicles(): Observable<VehicleResponse[]> {
    return this.http.get<VehicleResponse[]>(`${this.loginUrl}/all`).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  getVehicleBrands(): Observable<VehicleBrand[]> {
    return this.http.get<VehicleBrand[]>(`${this.loginUrlBrand}/all`).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  getVehicleTypes(): Observable<VehicleType[]> {
    return this.http.get<VehicleType[]>(`${this.loginUrlType}/all`).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  getVehicle(id: string): Observable<VehicleResponse> {
    return this.http.get<VehicleResponse>(`${this.loginUrl}/${id}`).pipe(
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
