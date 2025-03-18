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

    getMechanics() {}

    addMechanic(mechanic: Mechanic): Observable<any> {
        mechanic.role = 'mecanicien';
        return this.http.post<any>(`${environment.apiUrl}/register`, mechanic).pipe(
            tap((response) => {
                console.log('Inscription de mécanicien réussie');
                return response;
            }),
            catchError((error) => {
                console.error("Erreur lors de l'inscription :", error);
                return throwError(() => new Error("Échec de l'inscription. Veuillez réessayer."));
            })
        );
    }
}
