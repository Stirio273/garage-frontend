import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mechanic } from '../model/mechanic';
import { environment } from '../../environments/environment';
import { tap, catchError, throwError, Observable } from 'rxjs';
import { Service } from '../model/service';

@Injectable({
    providedIn: 'root'
})
export class ServiceService {
    constructor(private http: HttpClient) {}

    getServices(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/getServices`).pipe(
            tap((response) => {
                console.log(response);
            }),
            catchError((error) => {
                console.error('Erreur lors de la récupération des données : ', error);
                return throwError(() => new Error('Echec lors de la récuperation des services. Veuillez réessayer.'));
            })
        );
    }

    addService(service: Service): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/addService`, service).pipe(
            tap((response) => {
                console.log('Ajout du service réussie');
                // return response;
            }),
            catchError((error) => {
                console.error("Erreur lors de l'enregistrement :", error);
                return throwError(() => new Error("Échec de l'enregistrement. Veuillez réessayer."));
            })
        );
    }
}
