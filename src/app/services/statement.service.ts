import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Statement } from '../models/statement.model';

@Injectable({
  providedIn: 'root'
})
export class StatementService {

  private loginUrl = 'http://localhost:8080/temira/statement';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) { }

  getStatements(): Observable<Statement[]> {
    return this.http.get<Statement[]>(`${this.loginUrl}/all`);
  }

  getStatement(id: string): Observable<Statement> {
    return this.http.get<Statement>(`${this.loginUrl}/${id}`);
  }

  createStatement(statement: Statement): Observable<any> {
    return this.http.post<any>(`${this.loginUrl}/add`, statement);
  }

  updateStatement(id: string, statement: Statement): Observable<any> {
    return this.http.put<any>(`${this.loginUrl}/${id}`, statement);
  }

  deleteStatement(id: string): Observable<any> {
    return this.http.delete<any>(`${this.loginUrl}/${id}`);
  }
}
