import { Routes } from '@angular/router';
import { Empty } from './empty/empty';
import { CarListComponent } from './vehicules/car-list.component';
import { AuthGuard } from '../service/auth-guard.service';

export default [
    { path: 'empty', component: Empty },
    { path: 'vehicules', component: CarListComponent, canActivate: [AuthGuard] },
    // { path: 'my-tasks', component: Crud },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
