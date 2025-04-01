import { CategorieType } from './categorie-service.type';

export interface Service {
    _id?: string;
    description?: string;
    commentaires?: string;
    cout?: number;
    dureeEstimee?: number;
    typeservice?: CategorieType;
}
