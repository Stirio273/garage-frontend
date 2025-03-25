import { Routes } from '@angular/router';
import { Empty } from './empty/empty';
import { CarListComponent } from './vehicules/car-list.component';
import { AuthGuard } from '../service/auth-guard.service';
import { MechanicCrudComponent } from './mecaniciens/mechanic-crud.component';
import { ServiceCrudComponent } from './services/service-crud.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { TaskListComponent } from './task-list/task-list.component';

export default [
    { path: 'empty', component: Empty },
    { path: 'vehicules', component: CarListComponent, canActivate: [AuthGuard], data: { role: 'client' } },
    { path: 'mecaniciens', component: MechanicCrudComponent, canActivate: [AuthGuard], data: { role: 'manager' } },
    { path: 'services', component: ServiceCrudComponent, canActivate: [AuthGuard], data: { role: 'manager' } },
    { path: 'reservations', component: ReservationListComponent, canActivate: [AuthGuard], data: { role: 'manager' } },
    { path: 'my-tasks', component: TaskListComponent },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
