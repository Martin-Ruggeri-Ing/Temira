import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { StatementRequest, StatementResponse } from '../models/statement.model';
import { environment } from '../environments/environment';
import { HandleErrorService } from './handle-error.service';
@Injectable({
  providedIn: 'root'
})
export class StatementService {

  private loginUrl = environment.apiUrl+'/statement';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private handleErrorService: HandleErrorService) { }

  getStatements(): Observable<StatementResponse[]> {
    return this.http.get<StatementResponse[]>(`${this.loginUrl}/all`).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  getStatement(id: string): Observable<StatementResponse> {
    return this.http.get<StatementResponse>(`${this.loginUrl}/${id}`).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  createStatement(statement: FormData): Observable<any> {
    return this.http.post<any>(`${this.loginUrl}/add`, statement).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  updateStatement(id: string, statement: StatementRequest): Observable<any> {
    return this.http.put<any>(`${this.loginUrl}/${id}`, statement).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  deleteStatement(id: string): Observable<any> {
    return this.http.delete<any>(`${this.loginUrl}/${id}`).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }
}
