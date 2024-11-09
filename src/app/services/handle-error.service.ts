import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })

export class HandleErrorService {
    
    constructor(private http: HttpClient) { }
    
    handleError(error: HttpErrorResponse) {
        if(error.status===0){
            console.error('Se ha producio un error ', error.error);
            }
            else{
            console.error('Backend retornó el código de estado ', error.status, error.error);
            }
            return throwError(()=> new Error('Algo falló. Por favor intente nuevamente.'));
    }
}
