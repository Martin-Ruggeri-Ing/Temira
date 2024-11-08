import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { SleepDetectorRequest, SleepDetectorResponse } from '../models/sleep-detector.model';

@Injectable({
  providedIn: 'root'
})
export class SleepDetectorService {

  private loginUrl = 'http://localhost:8080/temira/sleepDetector';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) { }

  getSleepDetectors(): Observable<SleepDetectorResponse[]> {
    return this.http.get<SleepDetectorResponse[]>(`${this.loginUrl}/all`);
  }

  getSleepDetector(id: string): Observable<SleepDetectorResponse> {
    return this.http.get<SleepDetectorResponse>(`${this.loginUrl}/${id}`);
  }

  createSleepDetector(sleepDetector: SleepDetectorRequest): Observable<any> {
    return this.http.post<any>(`${this.loginUrl}/add`, sleepDetector);
  }

  updateSleepDetector(id: string, sleepDetector: SleepDetectorRequest): Observable<any> {
    return this.http.put<any>(`${this.loginUrl}/${id}`, sleepDetector);
  }

  deleteSleepDetector(id: string): Observable<any> {
    return this.http.delete<any>(`${this.loginUrl}/${id}`);
  }
}
