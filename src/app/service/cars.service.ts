import { Injectable } from '@angular/core';
import { Car } from '../model/car';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class CarsService {
    constructor(
        private http: HttpClient,
        private auth: AuthService
    ) {}

    getCars(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/listVoiture`, { params: { userEmail: this.auth.currentUser()?.email as string } }).pipe(
            tap((response) => {
                // console.log(response);
            }),
            catchError((error) => {
                return throwError(() => new Error('Erreur lors de la récupération de la liste des véhicules'));
            })
        );
    }

    addCar(car: FormData): Observable<string> {
        car.append('userEmail', this.auth.currentUser()?.email as string);
        return this.http.post<string>(`${environment.apiUrl}/addVoiture`, { data: car }).pipe(
            tap((response) => {
                console.log(response);
            }),
            catchError((error) => {
                return throwError(() => new Error("Echec de l'ajout du véhicule."));
            })
        );
    }
}
