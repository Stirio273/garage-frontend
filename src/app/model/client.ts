import { ProfilType } from './profil-type.type';
import { Car } from './car';

export interface Client {
    _id?: string;
    name: string;
    firstName: string;
    email: string;
    password: string;
    phoneNumber: string;
    role: ProfilType;
    voitures?: Car[];
}
