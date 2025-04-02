import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MessagesModule } from 'primeng/messages';
import { TaskService } from '../../service/task.service';
import { Task } from '../../model/task';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { AvatarModule } from 'primeng/avatar';
import { DropdownModule } from 'primeng/dropdown';
import { TextareaModule } from 'primeng/textarea';
import { CalendarModule } from 'primeng/calendar';
import { ServiceService } from '../../service/service.service';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
    selector: 'app-task-list',
    standalone: true,
    imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, DialogModule, MessagesModule, TableModule, CardModule, CheckboxModule, AvatarModule, ConfirmDialogModule, DropdownModule, TextareaModule, CalendarModule],
    templateUrl: './task-list.component.html',
    styleUrl: './task-list.component.scss',
    providers: [ConfirmationService]
})
export class TaskListComponent {
    isEdit: boolean = false;
    selectedTask!: Task;
    task!: Task;
    tasks!: Task[];
    completeTask!: Task;
    visible: boolean = false;
    messages: any[] = [];
    // New task form properties
    showNewTaskDialog: boolean = false;
    newTask: Task = {};
    // Service options for dropdown
    services = [];
    selectedService: any;

    constructor(
        private taskService: TaskService,
        private serviceService: ServiceService,
        private confirmationService: ConfirmationService
    ) {
        this.tasks = [
            // {
            //     id: '1',
            //     name: 'Create a New Landing UI',
            //     description: '',
            //     startDate: new Date(),
            //     dueDate: new Date('2024-05-13'),
            //     completed: false,
            //     commentaires: 'Commentaire de la tâche 1',
            //     mecanicien: { id: '1', name: 'John', firstName: 'Doe' }
            // },
            // {
            //     id: '2',
            //     name: 'Create Dashboard',
            //     description: '',
            //     startDate: new Date(),
            //     dueDate: new Date('2024-05-16'),
            //     completed: false,
            //     commentaires: 'Commentaire de la tâche 2',
            //     mecanicien: { id: '1', name: 'John', firstName: 'Doe' }
            // },
            // {
            //     id: '3',
            //     name: 'Brand logo design',
            //     description: '',
            //     startDate: new Date(),
            //     dueDate: new Date('2024-05-17'),
            //     completed: false,
            //     commentaires: 'Commentaire de la tâche 3',
            //     mecanicien: { id: '1', name: 'John', firstName: 'Doe' }
            // },
            // {
            //     id: '4',
            //     name: 'Create Dashboard',
            //     description: '',
            //     startDate: new Date(),
            //     dueDate: new Date('2024-05-20'),
            //     completed: false,
            //     commentaires: 'Commentaire de la tâche 4',
            //     mecanicien: { id: '1', name: 'John', firstName: 'Doe' }
            // }
        ];
        this.serviceService.getServicesForTask().subscribe((response) => {
            this.services = response.data;
        });
    }

    toggleTaskCompletion(task: Task) {
        // Call service to update status
        this.taskService.updateTaskStatus(task.id as string, !task.completed).subscribe({
            next: () => {
                // If service call successful, update local state
                task.completed = !task.completed;
            },
            error: () => {
                // If service call fails, show error message
                this.messages = [
                    {
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to update task status. Please try again.'
                    }
                ];

                // Revert checkbox state
                task.completed = !task.completed;
            }
        });
    }

    private save() {
        // localStorage.setItem('todoItem', JSON.stringify(this.taskItemsArray));
        // localStorage.setItem('completTodoItem', JSON.stringify(this.completedTasks));
    }

    visibleEdit(task: Task) {
        this.editItem(task);
        this.showDialog();
    }

    showDialog() {
        this.visible = true;
    }

    editItem(task: Task) {
        this.isEdit = true;
        this.selectedTask = { ...task };
    }

    cancelEdit() {
        this.selectedTask = { ...this.task };
        this.isEdit = false;
    }

    // New task form methods
    openNewTaskDialog() {
        this.showNewTaskDialog = true;
        this.newTask = {};
    }

    submitNewTask() {
        if (!this.selectedService) {
            this.messages = [
                {
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Veuillez sélectionner un service'
                }
            ];
            return;
        }

        // Create new task with selected service
        const task: Task = {
            ...this.selectedService,
            ...this.newTask
        };
        console.log(task);

        this.taskService.addTask(task).subscribe({
            next: (value) => {
                // Add task to list
                this.tasks.push(task);
                // Show success message
                this.messages = [
                    {
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Tâche ajoutée avec succès'
                    }
                ];
            },
            error: (error) => {
                this.messages = [{ severity: 'error', summary: 'Erreur', detail: error.message }];
            }
        });

        // Close dialog and reset form
        this.showNewTaskDialog = false;
        this.selectedService = null;
    }

    finishAllTasks() {
        // // Get all incomplete tasks
        // const incompleteTasks = this.tasks.filter((task) => !task.completed);

        // if (incompleteTasks.length === 0) {
        //     this.messages = [
        //         {
        //             severity: 'info',
        //             summary: 'Information',
        //             detail: 'Toutes les tâches sont déjà terminées'
        //         }
        //     ];
        //     return;
        // }

        // Show confirmation dialog
        this.confirmationService.confirm({
            message: 'Êtes-vous sur de vouloir terminer toutes les services pour le client actuel ?',
            header: 'Confirmation',
            icon: 'pi pi-check-circle',
            accept: () => {
                this.taskService.endAllTasks().subscribe({
                    next: (value) => {
                        this.messages = [{ severity: 'success', summary: 'Succès', detail: 'Toutes les tâches ont été terminées' }];
                    },
                    error: () => {
                        this.messages = [{ severity: 'error', summary: 'Erreur', detail: 'Une erreur est survenue lors de la mise à jour des tâches' }];
                    }
                });
            }
        });
        // // Update each task's status
        // incompleteTasks.forEach((task) => {
        //     this.taskService.updateTaskStatus(task.id as string, true).subscribe({
        //         next: () => {
        //             task.completed = true;
        //             this.messages = [
        //                 {
        //                     severity: 'success',
        //                     summary: 'Succès',
        //                     detail: 'Toutes les tâches ont été terminées'
        //                 }
        //             ];
        //         },
        //         error: () => {
        //             this.messages = [
        //                 {
        //                     severity: 'error',
        //                     summary: 'Erreur',
        //                     detail: 'Une erreur est survenue lors de la mise à jour des tâches'
        //                 }
        //             ];
        //         }
        //     });
        // });
    }
}
