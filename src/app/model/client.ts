import { ProfilType } from './profil-type.type';

export interface Client {
    name: string;
    firstName: string;
    email: string;
    password: string;
    phoneNumber: string;
    role: ProfilType;
}
