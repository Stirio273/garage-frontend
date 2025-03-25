import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ProfilType } from '../model/profil-type.type';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class MenuService {
    menu: { [key: string]: MenuItem[] } = {
        manager: [
            {
                label: 'Accueil',
                items: [{ label: 'Tableau de bord', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }]
            },
            {
                label: 'Gestion des mécaniciens',
                items: [{ label: 'Liste des mécaniciens', icon: 'pi pi-fw pi-user', routerLink: ['/pages/mecaniciens'] }]
            },
            {
                label: 'Gestion des tâches',
                items: [
                    { label: 'Assigner des tâches', icon: 'pi pi-fw pi-wrench', routerLink: ['/pages/assign-tasks'] },
                    { label: 'Suivi des tâches', icon: 'pi pi-fw pi-list', routerLink: ['/pages/tasks'] }
                ]
            },
            {
                label: 'Planning du garage',
                items: [{ label: 'Liste des réservations', icon: 'pi pi-fw pi-calendar', routerLink: ['/pages/reservations'] }]
            },
            {
                label: 'Services proposés',
                items: [{ label: 'Liste des services', icon: 'pi pi-fw pi-cog', routerLink: ['/pages/services'] }]
            },
            {
                label: 'Caractéristiques du garage',
                items: [{ label: 'Informations générales', icon: 'pi pi-fw pi-pencil', routerLink: ['/pages/info'] }]
            }
        ],
        mecanicien: [
            {
                label: 'Mes tâches',
                items: [{ label: 'Liste des tâches', icon: 'pi pi-fw pi-list', routerLink: ['/pages/my-tasks'] }]
            },
            {
                label: 'Clients',
                items: [
                    { label: 'Messages clients', icon: 'pi pi-fw pi-envelope', routerLink: ['/pages/messaging'] },
                    { label: 'Réception des clients', icon: 'pi pi-fw pi-user', routerLink: ['/pages/reception'] }
                ]
            }
        ],
        client: [
            {
                label: 'Mes véhicules',
                items: [
                    { label: 'Liste des véhicules', icon: 'pi pi-fw pi-car', routerLink: ['/pages/vehicules'] },
                    { label: 'Historique des services', icon: 'pi pi-fw pi-list', routerLink: ['/pages/service-history'] }
                ]
            },
            {
                label: 'Services et devis',
                items: [
                    { label: 'Liste des services', icon: 'pi pi-fw pi-cog', routerLink: ['/pages/services'] },
                    { label: 'Demande de devis', icon: 'pi pi-fw pi-pencil', routerLink: ['/pages/devis'] }
                ]
            },
            {
                label: 'Réservations',
                items: [{ label: 'Prendre un rendez-vous', icon: 'pi pi-fw pi-calendar', routerLink: ['/pages/reservations'] }]
            },
            {
                label: 'Messages et assistances',
                items: [
                    { label: 'Envoyer des questions', icon: 'pi pi-fw pi-envelope', routerLink: ['/pages/questions'] },
                    { label: 'Assistance à distance', icon: 'pi pi-fw pi-question-circle', routerLink: ['/pages/assistance'] }
                ]
            },
            {
                label: 'Mon compte',
                items: [{ label: 'Informations personnelles', icon: 'pi pi-fw pi-user', routerLink: ['/pages/account'] }]
            }
        ]
    };
    constructor(private authService: AuthService) {}

    getMenu(): MenuItem[] {
        return this.menu[this.authService.currentUser()?.role ?? ''] ?? [];
    }
}
