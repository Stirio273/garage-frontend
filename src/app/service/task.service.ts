import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { of } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    addItem() {}

    updateTaskStatus(taskId: string, completed: boolean): Observable<void> {
        // TODO: Implement API call to update task status
        return of(void 0);
    }
}
