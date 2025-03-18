import { Routes } from '@angular/router';
import { Empty } from './empty/empty';
import { CarListComponent } from './vehicules/car-list.component';
import { AuthGuard } from '../service/auth-guard.service';
import { MechanicCrudComponent } from './mecaniciens/mechanic-crud-component.component';

export default [
    { path: 'empty', component: Empty },
    { path: 'vehicules', component: CarListComponent, canActivate: [AuthGuard], data: { role: 'client' } },
    { path: 'mecaniciens', component: MechanicCrudComponent, canActivate: [AuthGuard], data: { role: 'manager' } },
    // { path: 'my-tasks', component: Crud },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
