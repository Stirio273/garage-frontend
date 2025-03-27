export interface Task {
    id: string;
    name: string;
    description: string;
    completed: boolean;
    startDate: Date;
    dueDate: Date;
    commentsCount: number;
    attachmentsCount: number;
    assignedUsers: string[]; // Array of user avatar URLs
}
