import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { SleepDetector } from '../models/sleep-detector.model';

@Injectable({
  providedIn: 'root'
})
export class SleepDetectorService {

  private loginUrl = 'http://localhost:8080/temira/sleepDetector';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) { }

  getSleepDetectors(): Observable<SleepDetector[]> {
    return this.http.get<SleepDetector[]>(`${this.loginUrl}/all`);
  }

  getSleepDetector(id: string): Observable<SleepDetector> {
    return this.http.get<SleepDetector>(`${this.loginUrl}/${id}`);
  }

  createSleepDetector(sleepDetector: SleepDetector): Observable<any> {
    return this.http.post<any>(`${this.loginUrl}/add`, sleepDetector);
  }

  updateSleepDetector(id: string, sleepDetector: SleepDetector): Observable<any> {
    return this.http.put<any>(`${this.loginUrl}/${id}`, sleepDetector);
  }

  deleteSleepDetector(id: string): Observable<any> {
    return this.http.delete<any>(`${this.loginUrl}/${id}`);
  }
}
