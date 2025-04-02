import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { catchError, of, tap, throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}

    addTask(task: Task): Observable<any> {
        return this.http
            .post<any>(`${environment.apiUrl}/mecanicien/consommation-service`, { ...task, mecanicien: { id: this.authService.currentUser()?._id, name: this.authService.currentUser()?.name, firstName: this.authService.currentUser()?.firstName } })
            .pipe(
                tap((response) => {
                    console.log('Ajout de la tâche réussie');
                }),
                catchError((error) => {
                    console.error("Erreur lors de l'ajout de la tâche :", error);
                    return throwError(() => new Error("Erreur lors de l'ajout de la tâche"));
                })
            );
    }

    endAllTasks(): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/mecanicien/terminer-service`, {});
    }

    updateTaskStatus(taskId: string, completed: boolean): Observable<void> {
        // TODO: Implement API call to update task status
        return of(void 0);
    }
}
