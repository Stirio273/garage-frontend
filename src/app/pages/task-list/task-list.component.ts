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

@Component({
    selector: 'app-task-list',
    imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, DialogModule, MessagesModule, TableModule, CardModule, CheckboxModule],
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
            { id: '1', name: 'Acheter du lait', description: '', startDate: new Date(), dueDate: new Date(), completed: false },
            { id: '2', name: "Envoyer l'email", description: '', startDate: new Date(), dueDate: new Date(), completed: false },
            { id: '3', name: 'Réviser Angular', description: '', startDate: new Date(), dueDate: new Date(), completed: true },
            { id: '4', name: 'Faire du sport', description: '', startDate: new Date(), dueDate: new Date(), completed: true }
        ];
    }

    toggleTaskCompletion(task: Task) {
        task.completed = !task.completed;
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
