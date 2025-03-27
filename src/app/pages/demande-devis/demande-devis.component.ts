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

interface Service {
    id: number;
    name: string;
    description: string;
    price: number;
    duration: string;
    selected?: boolean;
}

interface Car {
    id: number;
    brand: string;
    model: string;
    year: number;
    plateNumber: string;
}

@Component({
    selector: 'app-demande-devis',
    standalone: true,
    imports: [CommonModule, FormsModule, TableModule, ButtonModule, CardModule, DropdownModule, CheckboxModule, InputTextModule, TextareaModule, ToastModule],
    providers: [MessageService],
    templateUrl: './demande-devis.component.html',
    styleUrl: './demande-devis.component.scss'
})
export class DemandeDevisComponent {
    services: Service[] = [
        {
            id: 1,
            name: "Changement d'huile",
            description: "Service complet de changement d'huile avec remplacement du filtre",
            price: 49.99,
            duration: '30 min'
        },
        {
            id: 2,
            name: 'Service de frein',
            description: 'Remplacement des plaquettes de frein et vérification du système',
            price: 129.99,
            duration: '2 heures'
        },
        {
            id: 3,
            name: 'Rotation de pneus',
            description: 'Rotation des pneus et vérification de la pression',
            price: 29.99,
            duration: '45 min'
        },
        {
            id: 4,
            name: 'Service de climatisation',
            description: 'Vérification et recharge du système de climatisation',
            price: 89.99,
            duration: '1 heure'
        },
        {
            id: 5,
            name: 'Vérification de la batterie',
            description: 'Vérification et remplacement si nécessaire',
            price: 39.99,
            duration: '30 min'
        }
    ];

    cars: Car[] = [
        {
            id: 1,
            brand: 'Toyota',
            model: 'Camry',
            year: 2020,
            plateNumber: 'ABC-123'
        },
        {
            id: 2,
            brand: 'Honda',
            model: 'Civic',
            year: 2021,
            plateNumber: 'XYZ-789'
        }
    ];

    selectedCar: Car | null = null;
    additionalNotes: string = '';
    messageService: MessageService;
    private cdnLinkElement!: HTMLLinkElement;

    constructor(messageService: MessageService) {
        this.messageService = messageService;
    }

    ngOnInit(): void {
        this.cdnLinkElement = document.createElement('link');
        this.cdnLinkElement.rel = 'stylesheet';
        this.cdnLinkElement.href = 'https://unpkg.com/primeflex@latest/primeflex.css'; // Example CDN link

        // Append the link element to the head of the document
        document.head.appendChild(this.cdnLinkElement);
    }

    onServiceSelect(service: Service) {
        service.selected = !service.selected;
    }

    getSelectedServices(): Service[] {
        return this.services.filter((service) => service.selected);
    }

    getTotalPrice(): number {
        return this.getSelectedServices().reduce((total, service) => total + service.price, 0);
    }

    onSubmit() {
        if (!this.selectedCar) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Please select a car'
            });
            return;
        }

        if (this.getSelectedServices().length === 0) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Please select at least one service'
            });
            return;
        }

        // Here you would typically send the data to your backend
        const formData = {
            car: this.selectedCar,
            services: this.getSelectedServices(),
            totalPrice: this.getTotalPrice(),
            notes: this.additionalNotes
        };

        console.log('Form submitted:', formData);

        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Quote request submitted successfully'
        });
    }

    ngOnDestroy(): void {
        // Remove the link element when the component is destroyed
        if (this.cdnLinkElement) {
            document.head.removeChild(this.cdnLinkElement);
        }
    }
}
