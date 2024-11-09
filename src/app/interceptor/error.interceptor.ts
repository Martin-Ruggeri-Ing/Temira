import { HttpEvent, HttpInterceptorFn, HttpHandlerFn, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';


export const ErrorInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 0) {
                console.error('Se ha producido un error ', error.error);
            } else {
                console.error('Backend retornó el código de estado ', error.status, error.error);
            }
            return throwError(() => new Error('Algo falló. Por favor intente nuevamente.'));
        })
    );
};