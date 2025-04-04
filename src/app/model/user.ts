import { ProfilType } from './profil-type.type';

export interface User {
    _id: string;
    name: string;
    firstName: string;
    email: string;
    password: string;
    role: ProfilType;
    token: string;
    refreshToken: string;
    expiresIn: number;
    refreshExpiresIn: number;
}
