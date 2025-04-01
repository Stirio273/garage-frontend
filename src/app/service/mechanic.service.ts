import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mechanic } from '../model/mechanic';
import { environment } from '../../environments/environment';
import { tap, catchError, throwError, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MechanicService {
    constructor(private http: HttpClient) {}

    getMechanics() {
        return this.http.get<any>(`${environment.apiUrl}/listMecaniciens`).pipe(
            tap((response) => {
                // console.log(response);
            }),
            catchError((error) => {
                console.error('Erreur lors de la récupération des mécaniciens :', error);
                return throwError(() => new Error('Échec de la récupération des mécaniciens. Veuillez réessayer.'));
            })
        );
    }

    addMechanic(mechanic: Mechanic): Observable<any> {
        mechanic.role = 'mecanicien';
        return this.http.post<any>(`${environment.apiUrl}/register`, mechanic).pipe(
            tap((response) => {
                // console.log(response);
            }),
            catchError((error) => {
                console.error("Erreur lors de l'inscription :", error);
                return throwError(() => new Error("Échec de l'inscription. Veuillez réessayer."));
            })
        );
    }

    deleteMechanic(id: string): Observable<any> {
        return this.http.delete<any>(`${environment.apiUrl}/mecanicien/${id}`).pipe(
            tap((response) => {
                console.log(response);
            }),
            catchError((error) => {
                console.error('Erreur lors de la suppression du mécanicien :', error);
                return throwError(() => new Error('Échec de la suppression du mécanicien. Veuillez réessayer.'));
            })
        );
    }

    updateMechanic(mechanic: Mechanic): Observable<any> {
        return this.http.put<any>(`${environment.apiUrl}/mecanicien/${mechanic._id}`, mechanic).pipe(
            tap((response) => {
                // console.log(response);
            }),
            catchError((error) => {
                console.error('Erreur lors de la mise à jour du mécanicien :', error);
                return throwError(() => new Error('Échec de la mise à jour du mécanicien. Veuillez réessayer.'));
            })
        );
    }
}
