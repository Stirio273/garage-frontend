import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DashboardService {
    constructor(private http: HttpClient) {}

    getTop5Services(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/top-services`).pipe(
            tap((response) => {
                // console.log(response);
            }),
            catchError((err) => {
                console.error(err);
                return throwError(() => new Error('Une erreur est survenue. Veuillez réessayer'));
            })
        );
    }

    getThisWeekRevenue(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/chiffre-affaire-semaine`).pipe(
            tap((response) => {
                // console.log(response);
            }),
            catchError((err) => {
                console.error(err);
                return throwError(() => new Error('Une erreur est survenue. Veuillez réessayer'));
            })
        );
    }

    getCustomerNumber(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/client-number`).pipe(
            tap((response) => {
                // console.log(response);
            }),
            catchError((err) => {
                console.error(err);
                return throwError(() => new Error('Une erreur est survenue. Veuillez réessayer'));
            })
        );
    }

    getRevenues(year: number): Observable<any> {
        return this.http.get(`${environment.apiUrl}/chiffre-affaire-mensuel`, { params: { year } }).pipe(
            tap((response) => {
                // console.log(response);
            }),
            catchError((err) => {
                console.error(err);
                return throwError(() => new Error('Une erreur est survenue. Veuillez réessayer'));
            })
        );
    }
}
