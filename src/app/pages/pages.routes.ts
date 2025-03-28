import { Routes } from '@angular/router';
import { Empty } from './empty/empty';
import { CarListComponent } from './vehicules/car-list.component';
import { AuthGuard } from '../service/auth-guard.service';
import { MechanicCrudComponent } from './mecaniciens/mechanic-crud.component';
import { ServiceCrudComponent } from './services/service-crud.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { TaskListComponent } from './task-list/task-list.component';
import { ChatComponent } from './chat/chat.component';
import { DemandeDevisComponent } from './demande-devis/demande-devis.component';
import { DetailsDevisComponent } from './details-devis/details-devis.component';
import { AppointmentRequestComponent } from './appointment-request/appointment-request.component';

export default [
    { path: 'empty', component: Empty },
    { path: 'vehicules', component: CarListComponent, canActivate: [AuthGuard], data: { role: 'client' } },
    { path: 'mecaniciens', component: MechanicCrudComponent, canActivate: [AuthGuard], data: { role: 'manager' } },
    { path: 'services', component: ServiceCrudComponent, canActivate: [AuthGuard], data: { role: 'manager' } },
    { path: 'reservations', component: ReservationListComponent, canActivate: [AuthGuard], data: { role: 'manager' } },
    { path: 'my-tasks', component: TaskListComponent, canActivate: [AuthGuard], data: { role: 'mecanicien' } },
    { path: 'messaging', component: ChatComponent, canActivate: [AuthGuard], data: { role: 'mecanicien' } },
    { path: 'demande-devis', component: DemandeDevisComponent, canActivate: [AuthGuard], data: { role: 'client' } },
    { path: 'details-devis', component: DetailsDevisComponent, canActivate: [AuthGuard], data: { role: 'client' } },
    { path: 'rendez-vous', component: AppointmentRequestComponent, canActivate: [AuthGuard], data: { role: 'client' } },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
