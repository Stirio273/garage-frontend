import { ProfilType } from './profil-type.type';

export interface Mechanic {
    _id?: string;
    code?: string;
    name?: string;
    firstName?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
    role?: ProfilType;
    status?: string;
}
