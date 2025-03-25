import { CategorieType } from './categorie-service.type';

export interface Service {
    id?: string;
    name?: string;
    description?: string;
    price?: number;
    dureeEstimee?: number;
    categorie?: CategorieType;
}
