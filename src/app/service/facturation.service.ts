import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { catchError, of, tap, throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Facture } from '../model/facture';

@Injectable({
    providedIn: 'root'
})
export class FacturationService {
    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}

    payerFacture(factureId: string, sommePaiement: number): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/paiement`, { factureId, sommePaiement }).pipe(
            tap((response) => {
                console.log(response);
            }),
            catchError((error) => {
                console.error('Erreur lors de la récupération des données : ', error);
                return throwError(() => new Error('Echec lors de la récuperation des factures. Veuillez réessayer.'));
            })
        );
    }

    getFactures(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/list-facture`).pipe(
            tap((response) => {
                console.log(response);
            }),
            catchError((error) => {
                console.error('Erreur lors de la récupération des données : ', error);
                return throwError(() => new Error('Echec lors de la récuperation des factures. Veuillez réessayer.'));
            })
        );
    }

    getFacturesByCustomerId(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/client/list-facture`, { params: { idClient: this.authService.currentUser()?._id as string } }).pipe(
            tap((response) => {
                console.log(response);
            }),
            catchError((error) => {
                console.error('Erreur lors de la récupération des données : ', error);
                return throwError(() => new Error('Echec lors de la récuperation des factures. Veuillez réessayer.'));
            })
        );
    }
}
