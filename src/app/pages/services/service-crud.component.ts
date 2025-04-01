import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarComponent } from '../../layout/component/app.toolbar';
import { Service } from '../../model/service';
import { Mechanic } from '../../model/mechanic';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ServiceService } from '../../service/service.service';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { CategorieType } from '../../model/categorie-service.type';
import { SelectModule } from 'primeng/select';

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

interface ExportColumn {
    title: string;
    dataKey: string;
}

@Component({
    selector: 'app-service-crud',
    imports: [CommonModule, TableModule, FormsModule, ButtonModule, ToastModule, ToolbarComponent, IconFieldModule, InputIconModule, SelectModule, DialogModule, ConfirmDialogModule, InputTextModule, InputNumberModule, TextareaModule],
    templateUrl: './service-crud.component.html',
    styleUrl: './service-crud.component.scss',
    providers: [MessageService, ConfirmationService]
})
export class ServiceCrudComponent implements OnInit {
    serviceDialog: boolean = false;
    services = signal<Service[]>([]);
    service!: Service;
    categories!: { name: String; value: CategorieType }[];
    selectedServices!: Service[] | null;
    submitted: boolean = false;
    statuses!: any[];
    @ViewChild('dt') dt!: Table;
    exportColumns!: ExportColumn[];
    cols!: Column[];

    constructor(
        private serviceService: ServiceService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.categories = [
            { name: 'Entretien', value: 'Entretien' },
            { name: 'Réparation', value: 'Réparation' },
            { name: 'Autre', value: 'Autre' }
        ];
        this.serviceService.getServices().subscribe((value) => {
            this.services.set(value.data);
        });
        this.cols = [
            { field: 'description', header: 'Description' },
            { field: 'commentaires', header: 'Commentaires' },
            { field: 'cout', header: 'Prix' },
            { field: 'typeservice', header: 'Catégorie' }
        ];
    }

    exportCSV() {
        this.dt.exportCSV();
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew() {
        this.service = { cout: 0, dureeEstimee: 0 };
        this.submitted = false;
        this.serviceDialog = true;
    }

    onEditService(service: Service) {
        this.service = { ...service };
        this.serviceDialog = true;
    }

    onDeleteSelectedServices() {
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr de vouloir supprimer les services sélectionnés?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                // Appel de l'API pour supprimer les employés sélectionnés
                // Placer le code ici
                this.selectedServices = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Services supprimés',
                    life: 3000
                });
            }
        });
    }

    hideDialog() {
        this.serviceDialog = false;
        this.submitted = false;
    }

    onDeleteService(service: Service) {
        this.confirmationService.confirm({
            message: 'Êtes-vous sur de vouloir supprimer ' + service.description + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.serviceService.deleteService(service._id as string).subscribe({
                    next: (response) => {
                        this.services.set(this.services().filter((val) => val._id !== service._id));
                        this.service = { cout: 0, dureeEstimee: 0 };
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Service supprimé',
                            life: 3000
                        });
                    },
                    error: (error) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erreur',
                            detail: 'Erreur lors de la suppression du service'
                        });
                    }
                });
            }
        });
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.services().length; i++) {
            if (this.services()[i]._id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    onSaveService() {
        this.submitted = true;
        let _services = this.services();
        if (this.service.description?.trim()) {
            if (this.service._id) {
                _services[this.findIndexById(this.service._id as string)] = this.service;
                this.services.set([..._services]);
                this.serviceService.updateService(this.service).subscribe({
                    next: (response) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Service mis à jour',
                            life: 3000
                        });
                    },
                    error: (error) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erreur',
                            detail: 'Erreur lors de la création du service'
                        });
                    }
                });
            } else {
                this.services.set([..._services, this.service]);
                this.serviceService.addService(this.service).subscribe({
                    next: (response) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Service créé',
                            life: 3000
                        });
                    },
                    error: (error) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erreur',
                            detail: 'Erreur lors de la création du service'
                        });
                    }
                });
            }

            this.serviceDialog = false;
            this.service = { cout: 0, dureeEstimee: 0 };
        }
    }
}
