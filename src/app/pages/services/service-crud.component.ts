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
            { name: 'Entretien', value: 'entretien' },
            { name: 'Diagnostic', value: 'diagnostic' },
            { name: 'Réparation', value: 'reparation' }
        ];
        this.serviceService.getServices().subscribe((value) => {
            this.services.set(value);
        });
    }

    exportCSV() {
        this.dt.exportCSV();
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew() {
        this.service = { price: 0, dureeEstimee: 0 };
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
            message: 'Êtes-vous sur de vouloir supprimer' + service.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.services.set(this.services().filter((val) => val.id !== service.id));
                this.service = { price: 0, dureeEstimee: 0 };
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Service supprimé',
                    life: 3000
                });
            }
        });
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.services().length; i++) {
            if (this.services()[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    onSaveService() {
        this.submitted = true;
        let _services = this.services();
        if (this.service.name?.trim()) {
            if (this.service.id) {
                // _services[this.findIndexById(this.service.id)] = this.service;
                // this.services.set([..._services]);
                // this.messageService.add({
                //     severity: 'success',
                //     summary: 'Successful',
                //     detail: 'Service mis à jour',
                //     life: 3000
                // });
            } else {
                this.serviceService.addService(this.service).subscribe({
                    next: (response) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Service créé',
                            life: 3000
                        });
                    },
                    error: (error) => {}
                });
                // this.mechanics.set([..._mechanics, this.mechanic]);
            }

            this.serviceDialog = false;
            this.service = { price: 0, dureeEstimee: 0 };
        }
    }
}
