import { Routes } from '@angular/router';
import { Empty } from './empty/empty';
import { CarListComponent } from './vehicules/car-list.component';
import { AuthGuard } from '../service/auth-guard.service';
import { MechanicCrudComponent } from './mecaniciens/mechanic-crud.component';
import { ServiceCrudComponent } from './services/service-crud.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { TaskListComponent } from './task-list/task-list.component';
import { ChatComponent } from './chat/chat.component';
import { DemandeServiceComponent } from './demande-service/demande-service.component';
import { DetailsDevisComponent } from './details-devis/details-devis.component';
import { AppointmentRequestComponent } from './appointment-request/appointment-request.component';
import { ReceptionClientComponent } from './reception-client/reception-client.component';
import { FacturationListComponent } from './facturation-list/facturation-list.component';
import { PaiementComponent } from './paiement/paiement.component';
import { FactureClientListComponent } from './facture-client-list/facture-client-list.component';

export default [
    { path: 'empty', component: Empty },
    { path: 'vehicules', component: CarListComponent, canActivate: [AuthGuard], data: { role: 'client' } },
    { path: 'mecaniciens', component: MechanicCrudComponent, canActivate: [AuthGuard], data: { role: 'manager' } },
    { path: 'services', component: ServiceCrudComponent, canActivate: [AuthGuard], data: { role: 'manager' } },
    { path: 'reservations', component: ReservationListComponent, canActivate: [AuthGuard], data: { role: 'manager' } },
    { path: 'my-tasks', component: TaskListComponent, canActivate: [AuthGuard], data: { role: 'mecanicien' } },
    { path: 'messaging', component: ChatComponent, canActivate: [AuthGuard], data: { role: 'mecanicien' } },
    { path: 'demande-service', component: DemandeServiceComponent, canActivate: [AuthGuard], data: { role: 'client' } },
    { path: 'details-devis', component: DetailsDevisComponent, canActivate: [AuthGuard], data: { role: 'client' } },
    { path: 'rendez-vous', component: AppointmentRequestComponent, canActivate: [AuthGuard], data: { role: 'client' } },
    { path: 'reception-client', component: ReceptionClientComponent, canActivate: [AuthGuard], data: { role: 'mecanicien' } },
    { path: 'facturation-client', component: FacturationListComponent, canActivate: [AuthGuard], data: { role: 'manager' } },
    { path: 'facturation/payer/:idFacture', component: PaiementComponent, canActivate: [AuthGuard], data: { role: 'manager' } },
    { path: 'mes-factures', component: FactureClientListComponent, canActivate: [AuthGuard], data: { role: 'client' } },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
