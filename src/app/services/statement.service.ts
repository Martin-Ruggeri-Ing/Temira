import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { StatementRequest, StatementResponse } from '../models/statement.model';

@Injectable({
  providedIn: 'root'
})
export class StatementService {

  private loginUrl = 'http://localhost:8080/temira/statement';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) { }

  getStatements(): Observable<StatementResponse[]> {
    return this.http.get<StatementResponse[]>(`${this.loginUrl}/all`);
  }

  getStatement(id: string): Observable<StatementResponse> {
    return this.http.get<StatementResponse>(`${this.loginUrl}/${id}`);
  }

  createStatement(statement: StatementRequest): Observable<any> {
    return this.http.post<any>(`${this.loginUrl}/add`, statement);
  }

  updateStatement(id: string, statement: StatementRequest): Observable<any> {
    return this.http.put<any>(`${this.loginUrl}/${id}`, statement);
  }

  deleteStatement(id: string): Observable<any> {
    return this.http.delete<any>(`${this.loginUrl}/${id}`);
  }
}
