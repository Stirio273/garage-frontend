export interface Task {
    id?: string;
    name?: string;
    description?: string;
    completed?: boolean;
    startDate?: Date;
    dueDate?: Date;
    commentaires?: string;
    mecanicien?: { id: string; name: string; firstName: string };
}
