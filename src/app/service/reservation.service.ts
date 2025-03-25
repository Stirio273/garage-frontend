import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ReservationService {
    constructor(private http: HttpClient) {}

    getReservations(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/getReservations`).pipe(
            tap((response) => {
                console.log(response);
            }),
            catchError((error) => {
                console.error('Erreur lors de la récupération des données : ', error);
                return throwError(() => new Error('Echec lors de la récuperation des réservations. Veuillez réessayer.'));
            })
        );
    }
}
