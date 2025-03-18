import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Mechanic } from '../../model/mechanic';
import { MechanicService } from '../../service/mechanic.service';
import { MessagesModule } from 'primeng/messages';

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
    selector: 'app-mechanic-crud-component',
    imports: [
        CommonModule,
        TableModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        TextareaModule,
        SelectModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        TagModule,
        InputIconModule,
        IconFieldModule,
        ConfirmDialogModule,
        PasswordModule,
        ToastModule
    ],
    templateUrl: './mechanic-crud-component.component.html',
    styleUrl: './mechanic-crud-component.component.scss',
    providers: [MessageService, ConfirmationService]
})
export class MechanicCrudComponent implements OnInit {
    mechanicDialog: boolean = false;
    mechanics = signal<Mechanic[]>([]);
    mechanic!: Mechanic;
    selectedMechanics!: Mechanic[] | null;
    submitted: boolean = false;
    statuses!: any[];
    @ViewChild('dt') dt!: Table;
    exportColumns!: ExportColumn[];
    cols!: Column[];

    constructor(
        private mechanicService: MechanicService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {}

    exportCSV() {
        this.dt.exportCSV();
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew() {
        this.mechanic = {};
        this.submitted = false;
        this.mechanicDialog = true;
    }

    onEditMechanic(mechanic: Mechanic) {
        this.mechanic = { ...mechanic };
        this.mechanicDialog = true;
    }

    onDeleteSelectedMechanics() {
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr de vouloir supprimer les employés sélectionnés?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                // Appel de l'API pour supprimer les employés sélectionnés
                // Placer le code ici
                this.selectedMechanics = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Products Deleted',
                    life: 3000
                });
            }
        });
    }

    hideDialog() {
        this.mechanicDialog = false;
        this.submitted = false;
    }

    onDeleteMechanic(mechanic: Mechanic) {
        this.confirmationService.confirm({
            message: 'Êtes-vous sur de vouloir supprimer' + mechanic.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.mechanics.set(this.mechanics().filter((val) => val.id !== mechanic.id));
                this.mechanic = {};
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Deleted',
                    life: 3000
                });
            }
        });
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.mechanics().length; i++) {
            if (this.mechanics()[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    onSaveMechanic() {
        this.submitted = true;
        let _mechanics = this.mechanics();
        if (this.mechanic.name?.trim()) {
            if (this.mechanic.id) {
                _mechanics[this.findIndexById(this.mechanic.id)] = this.mechanic;
                this.mechanics.set([..._mechanics]);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Updated',
                    life: 3000
                });
            } else {
                // this.mechanic.id = this.createId();
                this.mechanicService.addMechanic(this.mechanic).subscribe({
                    next: (response) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Mécanicien créé',
                            life: 3000
                        });
                    },
                    error: (error) => {}
                });
                // this.mechanics.set([..._mechanics, this.mechanic]);
            }

            this.mechanicDialog = false;
            this.mechanic = {};
        }
    }
}
