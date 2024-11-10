import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { SleepDetectorRequest, SleepDetectorResponse, SleepDetectorModel } from '../models/sleep-detector.model';
import { environment } from '../environments/environment';
import { HandleErrorService } from './handle-error.service';

@Injectable({
  providedIn: 'root'
})
export class SleepDetectorService {

  private loginUrl = environment.apiUrl+'/sleepDetector';
  private loginUrlModel = environment.apiUrl+'/sleepDetectorModel';

  constructor(private http: HttpClient, private handleErrorService: HandleErrorService) { }

  getSleepDetectors(): Observable<SleepDetectorResponse[]> {
    return this.http.get<SleepDetectorResponse[]>(`${this.loginUrl}/all`).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  getSleepDetectorsModels(): Observable<SleepDetectorModel[]> {
    return this.http.get<SleepDetectorModel[]>(`${this.loginUrlModel}/all`).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  getSleepDetector(id: string): Observable<SleepDetectorResponse> {
    return this.http.get<SleepDetectorResponse>(`${this.loginUrl}/${id}`).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  createSleepDetector(sleepDetector: SleepDetectorRequest): Observable<any> {
    return this.http.post<any>(`${this.loginUrl}/add`, sleepDetector).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  updateSleepDetector(id: string, sleepDetector: SleepDetectorRequest): Observable<any> {
    return this.http.put<any>(`${this.loginUrl}/${id}`, sleepDetector).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  deleteSleepDetector(id: string): Observable<any> {
    return this.http.delete<any>(`${this.loginUrl}/${id}`).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }
}
