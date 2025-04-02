import { CategorieType } from './categorie-service.type';

export interface Service {
    _id?: string;
    description?: string;
    commentaires?: string;
    cout?: number;
    estimationDuree?: number;
    typeservice?: CategorieType;
    selected?: boolean;
}
