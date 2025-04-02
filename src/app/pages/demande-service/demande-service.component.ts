import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { CarsService } from '../../service/cars.service';
import { Car } from '../../model/car';
import { ServiceService } from '../../service/service.service';
import { Service } from '../../model/service';

@Component({
    selector: 'app-demande-service',
    standalone: true,
    imports: [CommonModule, FormsModule, TableModule, ButtonModule, CardModule, DropdownModule, CheckboxModule, InputTextModule, TextareaModule, ToastModule],
    providers: [MessageService],
    templateUrl: './demande-service.component.html',
    styleUrl: './demande-service.component.scss'
})
export class DemandeServiceComponent {
    services: Service[] = [];
    cars!: Car[];
    selectedCar: Car | null = null;
    additionalNotes: string = '';

    constructor(
        private messageService: MessageService,
        private carService: CarsService,
        private serviceService: ServiceService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.carService.getCars().subscribe((response) => {
            this.cars = response.response.voitures;
        });
        this.serviceService.getServices().subscribe((response) => {
            this.services = response.data;
        });
    }

    onServiceSelect(service: Service) {
        service.selected = !service.selected;
    }

    getSelectedServices(): Service[] {
        return this.services.filter((service) => service.selected);
    }

    getTotalPrice(): number {
        return this.getSelectedServices().reduce((total, service) => total + (service.cout ?? 0), 0);
    }

    onSubmit() {
        if (!this.selectedCar) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Veuillez sélectionner une voiture'
            });
            return;
        }

        if (this.getSelectedServices().length === 0) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Veuillez sélectionner au moins un service'
            });
            return;
        }

        // Transform selected services to match the QuoteService interface
        const quoteServices = this.getSelectedServices().map((service) => ({
            designation: service.description,
            quantity: 1,
            unitPrice: service.cout,
            amount: (service.cout ?? 0) * 1
        }));

        // Navigate to details-devis with the data
        this.router.navigate(['/pages/details-devis'], {
            state: {
                services: quoteServices,
                car: this.selectedCar,
                notes: this.additionalNotes
            }
        });
    }
}
