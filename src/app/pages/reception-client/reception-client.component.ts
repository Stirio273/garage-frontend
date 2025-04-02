import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Car } from '../../model/car';
import { CarsService } from '../../service/cars.service';
import { Client } from '../../model/client';
import { ClientService } from '../../service/client.service';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';

@Component({
    selector: 'app-reception-client',
    standalone: true,
    imports: [CommonModule, FormsModule, CardModule, DropdownModule, InputTextModule, InputGroupModule, ButtonModule, ToastModule],
    providers: [MessageService],
    templateUrl: './reception-client.component.html',
    styleUrl: './reception-client.component.scss'
})
export class ReceptionClientComponent implements OnInit {
    searchEmail: string = '';
    clients: Client[] = [];
    cars: Car[] = [];
    selectedClient: Client | null = null;
    selectedCar: Car | null = null;

    constructor(
        private carService: CarsService,
        private clientService: ClientService,
        private messageService: MessageService
    ) {}

    ngOnInit() {}

    onSearchCustomerByEmail() {
        if (this.searchEmail) {
            this.clientService.getClientByEmailForTask(this.searchEmail).subscribe((response) => {
                this.selectedClient = response.data;
                this.cars = this.selectedClient?.voitures ?? [];
            });
        }
    }

    onCarSelect() {
        if (this.selectedCar) {
            this.messageService.add({
                severity: 'success',
                summary: 'Véhicule sélectionné',
                detail: `${this.selectedCar.marque} ${this.selectedCar.modele} - ${this.selectedCar.plaqueImmatriculation}`
            });
        }
    }

    startService() {
        if (!this.selectedClient || !this.selectedCar) {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreur',
                detail: 'Veuillez sélectionner un client et un véhicule'
            });
            return;
        }
        this.clientService.startService(this.selectedClient._id as string, this.selectedCar._id as string, this.selectedClient.email as string).subscribe((response) => {
            console.log(response);
            this.messageService.add({
                severity: 'success',
                summary: 'Service démarré',
                detail: 'Vous pouvez maintenant commencer les services'
            });
        });
    }
}
