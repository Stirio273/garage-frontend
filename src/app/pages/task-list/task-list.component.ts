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

@Component({
    selector: 'app-task-list',
    imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, DialogModule, MessagesModule, TableModule, CardModule, CheckboxModule, AvatarModule],
    templateUrl: './task-list.component.html',
    styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
    isEdit: boolean = false;
    selectedTask!: Task;
    task!: Task;
    tasks!: Task[];
    completeTask!: Task;
    visible: boolean = false;
    messages: any[] = [];

    constructor(private service: TaskService) {
        this.tasks = [
            {
                id: '1',
                name: 'Create a New Landing UI',
                description: '',
                startDate: new Date(),
                dueDate: new Date('2024-05-13'),
                completed: false,
                commentsCount: 3,
                attachmentsCount: 2,
                assignedUsers: ['/assets/avatars/avatar1.jpg', '/assets/avatars/avatar2.jpg', '/assets/avatars/avatar3.jpg']
            },
            {
                id: '2',
                name: 'Create Dashboard',
                description: '',
                startDate: new Date(),
                dueDate: new Date('2024-05-16'),
                completed: false,
                commentsCount: 2,
                attachmentsCount: 4,
                assignedUsers: ['/assets/avatars/avatar1.jpg', '/assets/avatars/avatar2.jpg']
            },
            {
                id: '3',
                name: 'Brand logo design',
                description: '',
                startDate: new Date(),
                dueDate: new Date('2024-05-17'),
                completed: false,
                commentsCount: 4,
                attachmentsCount: 1,
                assignedUsers: ['/assets/avatars/avatar1.jpg', '/assets/avatars/avatar2.jpg', '/assets/avatars/avatar3.jpg']
            },
            {
                id: '4',
                name: 'Create Dashboard',
                description: '',
                startDate: new Date(),
                dueDate: new Date('2024-05-20'),
                completed: false,
                commentsCount: 1,
                attachmentsCount: 3,
                assignedUsers: ['/assets/avatars/avatar1.jpg', '/assets/avatars/avatar2.jpg']
            }
        ];
    }

    toggleTaskCompletion(task: Task) {
        // Call service to update status
        this.service.updateTaskStatus(task.id, !task.completed).subscribe({
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

    get pendingTasks() {
        return this.tasks.filter((task) => !task.completed);
    }

    get completedTasks() {
        return this.tasks.filter((task) => task.completed);
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
    //alert
    message() {
        this.messages = [{ severity: 'error', summary: 'Error', detail: 'Kérem írjon be egy teendőt!' }];
    }
    addItem() {
        // if (this.task.title === '') {
        //     this.message();
        //     return;
        // }
        // this.task.id = Date.now().toString();
        // this.taskItemsArray.push(this.task);
        // this.task = { id: '', title: '' };
        // this.save();
        // console.log(this.taskItemsArray);
    }

    deleteItem(item: Task) {
        // const index = this.taskItemsArray.indexOf(item);
        // if (index > -1) {
        //     this.taskItemsArray.splice(index, 1);
        //     this.save();
        // }
    }

    editItem(task: Task) {
        this.isEdit = true;
        this.selectedTask = { ...task };
    }

    cancelEdit() {
        this.selectedTask = { ...this.task };
        this.isEdit = false;
    }

    saveEdit() {
        // if (this.selectedTask.title === '') {
        //     alert('A todo elem nem lehet üres!');
        //     return;
        // }
        // // Megkeressük a todoItemsArray tömbben azt az elemet,
        // // amelyiknek az azonosítója megegyezik a selectedTodo objektum azonosítójával
        // const index = this.taskItemsArray.findIndex((item) => item.id === this.selectedTask.id);
        // // Ha találunk ilyen elemet, akkor módosítjuk a title és az id értékét
        // //a selectedTodo objektum title és id értékével
        // if (index > -1) {
        //     this.taskItemsArray[index].title = this.selectedTask.title;
        //     this.taskItemsArray[index].id = this.selectedTask.id;
        //     this.save();
        //     console.log(this.taskItemsArray);
        // }
        // this.isEdit = false;
    }

    complete(task: Task) {
        // const index = this.taskItemsArray.findIndex((item) => item.id === task.id);
        // if (index > -1) {
        //     this.completeTask = { ...task };
        //     this.completedTasks.push(this.completeTask);
        //     this.taskItemsArray.splice(index, 1);
        //     this.save();
        //     console.log(this.completedTasks);
        // }
    }

    completDelete(item: Task) {
        const index = this.completedTasks.indexOf(item);
        if (index > -1) {
            this.completedTasks.splice(index, 1);
            this.save();
        }
    }
}
