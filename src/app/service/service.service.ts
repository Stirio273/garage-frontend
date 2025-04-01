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
        return this.http.get(`${environment.apiUrl}/services`).pipe(
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
        return this.http.post<any>(`${environment.apiUrl}/services`, service).pipe(
            tap((response) => {
                console.log('Ajout du service réussie');
            }),
            catchError((error) => {
                console.error("Erreur lors de l'enregistrement :", error);
                return throwError(() => new Error("Échec de l'enregistrement. Veuillez réessayer."));
            })
        );
    }

    updateService(service: Service): Observable<any> {
        return this.http.put<any>(`${environment.apiUrl}/services/${service._id}`, service).pipe(
            tap((response) => {
                console.log('Service modifié avec succès');
            }),
            catchError((error) => {
                console.error('Erreur lors de la modification :', error);
                return throwError(() => new Error('Échec de la modification. Veuillez réessayer.'));
            })
        );
    }

    deleteService(id: string): Observable<any> {
        return this.http.delete<any>(`${environment.apiUrl}/services/${id}`).pipe(
            tap((response) => {
                console.log('Service supprimé avec succès');
            }),
            catchError((error) => {
                console.error('Erreur lors de la suppression :', error);
                return throwError(() => new Error('Échec de la suppression. Veuillez réessayer.'));
            })
        );
    }
}
