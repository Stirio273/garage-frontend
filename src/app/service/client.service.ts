import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Client } from '../model/client';

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    private apiUrl = `${environment.apiUrl}`;

    constructor(private http: HttpClient) {}

    startService(clientId: string, carId: string, userEmail: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/mecanicien/historiqueClientGrarage`, { idClient: clientId, idVoiture: carId, userEmail: userEmail });
    }

    getClientByEmail(email: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/client/user`, { params: { userEmail: email } });
    }

    getClientByEmailForTask(email: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/mecanicien/user`, { params: { userEmail: email } });
    }

    getAllClients(): Observable<Client[]> {
        return this.http.get<Client[]>(this.apiUrl);
    }

    getClientById(id: number): Observable<Client> {
        return this.http.get<Client>(`${this.apiUrl}/${id}`);
    }
}
