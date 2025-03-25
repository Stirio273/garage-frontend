export interface Task {
    id: string;
    name: string;
    description: string;
    completed: boolean;
    startDate: Date;
    dueDate: Date;
}
