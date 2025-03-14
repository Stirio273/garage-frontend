import { computed, Injectable, signal } from '@angular/core';
import { ProfilType } from '../model/profil-type.type';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { Client } from '../model/client';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _currentUser = signal<User | null>(null);
    currentUser = this._currentUser.asReadonly();
    isConnected = computed(() => this.currentUser() !== null);

    constructor(
        private http: HttpClient,
        private router: Router
    ) {}

    signIn(email: string, password: string): Observable<{ user: User }> {
        return this.http.post<{ user: User }>(`${environment.apiUrl}/login`, { email, password }).pipe(
            tap((response) => {
                this._currentUser.set(response.user);
                this.setSession(response.user);
            })
        );
    }

    signUp(customer: Client): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/register`, customer).pipe(
            tap((response) => {
                console.log('Inscription réussie');
            }),
            catchError((error) => {
                console.error("Erreur lors de l'inscription :", error);
                return throwError(() => new Error("Échec de l'inscription. Veuillez réessayer."));
            })
        );
    }

    revokeToken(): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/revoke-token`, {}, { withCredentials: true }).pipe(
            tap((response) => {
                // Les nouveaux tokens sont automatiquement stockés dans des cookies HTTP-only
                console.log('Tokens refreshed successfully');
            })
        );
    }

    logout(): Observable<any> {
        this._currentUser.set(null);
        localStorage.removeItem('user');
        return this.http.post<any>(`${environment.apiUrl}/logout`, {}, { withCredentials: true }).pipe(
            tap(() => {
                // Le backend devrait supprimer les cookies
                this._currentUser.set(null);
                localStorage.removeItem('user');
            })
        );
    }

    setSession(user: User): void {
        localStorage.setItem('user', JSON.stringify(user));
    }

    handleAuthentication(): void {
        if (localStorage.getItem('user')) {
            this._currentUser.set(JSON.parse(localStorage.getItem('user') as string));
        }
    }

    redirectUser(): void {
        let profil = this.currentUser()?.role;
        if (profil === 'manager') {
            this.router.navigate(['/dashboard']);
        } else if (profil === 'client') {
            this.router.navigate(['/pages/vehicules']);
        } else if (profil === 'mecanicien') {
            this.router.navigate(['/pages/my-tasks']);
        } else {
            this.router.navigate(['/']); // Page par défaut
        }
    }
}
