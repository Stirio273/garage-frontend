import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { StepsModule } from 'primeng/steps';
import { MenuItem } from 'primeng/api';

interface Service {
    id: number;
    name: string;
    description: string;
    price: number;
    duration: string;
    selected?: boolean;
}

interface TimeSlot {
    hour: string;
    available: boolean;
}

@Component({
    selector: 'app-appointment-request',
    standalone: true,
    imports: [CommonModule, FormsModule, TableModule, ButtonModule, CardModule, CheckboxModule, CalendarModule, ToastModule, StepsModule],
    providers: [MessageService],
    templateUrl: './appointment-request.component.html',
    styleUrl: './appointment-request.component.scss'
})
export class AppointmentRequestComponent implements OnInit {
    // Step management
    activeIndex: number = 0;
    items: MenuItem[] = [{ label: 'Services' }, { label: 'Date & Heure' }, { label: 'Confirmation' }];

    // Services data
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

    // Date and time selection
    selectedDate: Date | null = null;
    selectedTime: string | null = null;
    minDate: Date = new Date();
    timeSlots: TimeSlot[] = [
        { hour: '09:00', available: true },
        { hour: '10:00', available: true },
        { hour: '11:00', available: false },
        { hour: '14:00', available: true },
        { hour: '15:00', available: true },
        { hour: '16:00', available: false }
    ];

    // Disabled dates (example)
    disabledDates: Date[] = [new Date(2024, 2, 15), new Date(2024, 2, 16), new Date(2024, 2, 20)];

    constructor(private messageService: MessageService) {}

    ngOnInit() {}

    // Step navigation
    nextStep() {
        if (this.activeIndex < this.items.length - 1) {
            if (this.validateCurrentStep()) {
                this.activeIndex++;
            }
        }
    }

    previousStep() {
        if (this.activeIndex > 0) {
            this.activeIndex--;
        }
    }

    // Validation methods
    validateCurrentStep(): boolean {
        switch (this.activeIndex) {
            case 0:
                if (this.getSelectedServices().length === 0) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Veuillez sélectionner au moins un service'
                    });
                    return false;
                }
                break;
            case 1:
                if (!this.selectedDate || !this.selectedTime) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Veuillez sélectionner une date et une heure'
                    });
                    return false;
                }
                break;
        }
        return true;
    }

    // Service selection methods
    onServiceSelect(service: Service) {
        service.selected = !service.selected;
    }

    getSelectedServices(): Service[] {
        return this.services.filter((service) => service.selected);
    }

    getTotalPrice(): number {
        return this.getSelectedServices().reduce((total, service) => total + service.price, 0);
    }

    // Date and time methods
    isDateDisabled(date: Date): boolean {
        return this.disabledDates.some((disabledDate) => disabledDate.getDate() === date.getDate() && disabledDate.getMonth() === date.getMonth() && disabledDate.getFullYear() === date.getFullYear());
    }

    // Confirmation
    confirmAppointment() {
        const appointmentData = {
            services: this.getSelectedServices(),
            date: this.selectedDate,
            time: this.selectedTime,
            totalPrice: this.getTotalPrice()
        };

        console.log('Appointment confirmed:', appointmentData);

        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Réservation confirmée avec succès'
        });
    }
}
