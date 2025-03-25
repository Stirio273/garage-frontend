import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DashboardService {
    constructor(private http: HttpClient) {}

    getRevenues(annee: number): Observable<any> {
        return this.http.get(`${environment.apiUrl}/revenue`).pipe(
            tap((response) => {
                console.log(response);
            }),
            catchError((err) => {
                console.error(err);
                return throwError(() => new Error('Une erreur est survenue. Veuillez réessayer'));
            })
        );
    }
}
