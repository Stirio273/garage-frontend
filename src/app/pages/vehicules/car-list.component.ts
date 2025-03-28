import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
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
import { DataViewModule } from 'primeng/dataview';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Car } from '../../model/car';
import { CarsService } from '../../service/cars.service';
import { ToolbarComponent } from '../../layout/component/app.toolbar';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

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
    selector: 'app-car-list',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
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
        DataViewModule,
        ToolbarComponent,
        ProgressSpinnerModule
    ],
    template: `
        <p-toast></p-toast>

        <app-toolbar [disableDelete]="!selectedCars || !selectedCars.length" (newClicked)="openNew()" (deleteClicked)="deleteSelectedCars()" (exportClicked)="exportCSV()"></app-toolbar>

        <div class="flex flex-col">
            <div class="card">
                <div class="font-semibold text-xl"><h1>Mes véhicules</h1></div>
                <div class="relative">
                    <p-dataview *ngIf="!loading" [value]="cars()" layout="grid">
                        <ng-template #grid let-items>
                            <div class="grid grid-cols-12 gap-4 mt-4">
                                <div *ngFor="let item of items; let i = index" class="col-span-12 sm:col-span-6 lg:col-span-4 p-2">
                                    <div class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col">
                                        <div class="bg-surface-50 flex justify-center rounded p-6">
                                            <div class="relative mx-auto">
                                                <img class="rounded w-full" [src]="item.lienImage" [alt]="item.modele" style="max-width: 300px" />
                                            </div>
                                        </div>
                                        <div class="pt-12">
                                            <div class="flex flex-row justify-between items-start gap-2">
                                                <div>
                                                    <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ item.marque }}</span>
                                                    <div class="text-lg font-medium mt-1">{{ item.modele }}</div>
                                                </div>
                                            </div>
                                            <div class="flex flex-col mt-6">
                                                <p><b>Année : </b>{{ item.annee }}</p>
                                                <p><b>Plaque d'immatriculation : </b>{{ item.plaqueImmatriculation }}</p>
                                                <p><b>Kilométrage : </b>{{ item.kilometrage }}</p>
                                                <p><b>Type de carburant : </b>{{ item.typeCarburant }}</p>
                                                <p><b>Date du dernier entretien : </b>{{ item.dateDerniereEntretien | date }}</p>
                                                <p><b>Date d'expiration de l'assurance : </b>{{ item.dateExpirationAssurance | date }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ng-template>
                    </p-dataview>

                    <!-- Loading Overlay -->
                    <div *ngIf="loading" class="loading-overlay">
                        <div class="loading-content">
                            <p-progressSpinner [style]="{ width: '50px', height: '50px' }" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s"> </p-progressSpinner>
                            <span class="mt-3">Chargement des véhicules...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <p-dialog [(visible)]="carDialog" [style]="{ width: '675px' }" header="Details du véhicule" [modal]="true" [formGroup]="carForm">
            <ng-template #content>
                <div class="flex flex-col gap-6">
                    <!-- <img [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image" [alt]="product.image"
                class="block m-auto pb-4" *ngIf="product.image" /> -->
                    <div class="flex flex-col md:flex-row gap-6">
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="marque" class="block font-bold mb-3">Marque</label>
                            <input type="text" pInputText id="marque" formControlName="marque" required autofocus fluid />
                            <!-- <small class="text-red-500" *ngIf="submitted && !car.marque">La marque est obligatoire.</small> -->
                        </div>
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="modele" class="block font-bold mb-3">Modèle</label>
                            <input type="text" pInputText id="modele" formControlName="modele" required autofocus fluid />
                            <!-- <small class="text-red-500" *ngIf="submitted && !car.modele">Le modèle est obligatoire.</small> -->
                        </div>
                    </div>
                    <div class="flex flex-col md:flex-row gap-6">
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="annee" class="block font-bold mb-3">Année</label>
                            <input type="number" pInputText id="annee" formControlName="annee" required autofocus fluid />
                            <!-- <small class="text-red-500" *ngIf="submitted && !car.annee">L'année est obligatoire.</small> -->
                        </div>
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="plaqueImmatriculation" class="block font-bold mb-3">Plaque d'immatriculation</label>
                            <input type="text" pInputText id="plaqueImmatriculation" formControlName="plaqueImmatriculation" required autofocus fluid />
                            <!-- <small class="text-red-500" *ngIf="submitted && !car.plaqueImmatriculation">La plaque d'immatriculation est obligatoire.</small> -->
                        </div>
                    </div>
                    <div class="flex flex-col md:flex-row gap-6">
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="kilometrage" class="block font-bold mb-3">Kilométrage</label>
                            <input type="number" pInputText id="kilometrage" formControlName="kilometrage" required autofocus fluid />
                            <!-- <small class="text-red-500" *ngIf="submitted && !car.kilometrage">Le Kilométrage est obligatoire.</small> -->
                        </div>
                        <div class="flex-col flex-wrap gap-2 w-full">
                            <span class="block font-bold mb-8">Type de carburant</span>
                            <div class="grid grid-cols-12 gap-4">
                                <div class="flex items-center gap-2 col-span-6">
                                    <p-radiobutton id="essence" name="typeCarburant" value="Essence" formControlName="typeCarburant" />
                                    <label for="essence">Essence</label>
                                </div>
                                <div class="flex items-center gap-2 col-span-6">
                                    <p-radiobutton id="diesel" name="typeCarburant" value="Diesel" formControlName="typeCarburant" />
                                    <label for="diesel">Diesel</label>
                                </div>
                                <div class="flex items-center gap-2 col-span-6">
                                    <p-radiobutton id="hybride" name="typeCarburant" value="Hybride" formControlName="typeCarburant" />
                                    <label for="hybride">Hybride</label>
                                </div>
                                <div class="flex items-center gap-2 col-span-6">
                                    <p-radiobutton id="electrique" name="typeCarburant" value="Electrique" formControlName="typeCarburant" />
                                    <label for="electrique">Electrique</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col md:flex-row gap-6">
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="dateDernierEntretien" class="block font-bold mb-3">Date du dernier entretien</label>
                            <input type="datetime-local" name="dateDerniereEntretien" id="dateDerniereEntretien" formControlName="dateDerniereEntretien" />
                        </div>
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="dateExpirationAssurance" class="block font-bold mb-3">Date d'expiration de l'assurance</label>
                            <input type="datetime-local" name="dateExpirationAssurance" id="dateExpirationAssurance" formControlName="dateExpirationAssurance" />
                        </div>
                    </div>
                    <mat-form-field appearance="fill">
                        <mat-label>Photo</mat-label>
                        <div class="fileUploadContainer" [ngStyle]="{ 'margin-top': carForm.get('image')!.value ? '5px' : '20px' }">
                            <ng-container *ngIf="carForm.get('image')">
                                <img [src]="carForm.get('image')!.value" />
                                <button class="deleteButton" mat-icon-button (click)="fileInput.value = ''; carForm.get('image')?.setValue(null)">
                                    <mat-icon>close</mat-icon>
                                </button>
                            </ng-container>
                            <!-- no image -->
                            <div *ngIf="!carForm.get('image')!.value" fxLayout="column" fxLayoutAlign="center center" fxLayoutGap="10px">
                                <mat-icon style="opacity: 60%;">file_upload</mat-icon>
                                <button mat-raised-button color="primary" style="width:100%; opacity: 80%;">Browser</button>
                                <small style="margin: 20px">Drag and drop here</small>
                            </div>
                            <!-- put on top of the fileUploadContainer with opacity 0 -->
                            <input #fileInput class="fileInput" type="file" multiple="multiple" accept="image/*" (change)="setFileData($event)" />
                        </div>
                        <input matInput formControlName="image" readonly [hidden]="true" />
                    </mat-form-field>
                </div>
            </ng-template>

            <ng-template #footer>
                <p-button label="Annuler" icon="pi pi-times" text (click)="hideDialog()" />
                <p-button label="Enregistrer" type="submit" icon="pi pi-check" (click)="onSaveCar()" />
            </ng-template>
        </p-dialog>

        <p-confirmdialog [style]="{ width: '450px' }" />
    `,
    styleUrl: './car-list.component.scss',
    providers: [MessageService, CarsService, ConfirmationService, provideNativeDateAdapter()]
})
export class CarListComponent implements OnInit {
    carDialog: boolean = false;

    cars = signal<Car[]>([]);

    selectedFileCarForm!: File;
    carForm!: FormGroup;

    selectedCars!: Car[] | null;

    submitted: boolean = false;

    statuses!: any[];

    @ViewChild('dt') dt!: Table;

    exportColumns!: ExportColumn[];

    cols!: Column[];

    loading: boolean = true;

    constructor(
        private carsService: CarsService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private formBuilder: FormBuilder
    ) {}

    exportCSV() {
        this.dt.exportCSV();
    }

    ngOnInit() {
        // this.loadDemoData();
        this.carsService.getCars().subscribe({
            next: (value) => {
                this.cars.set(value.response.voitures);
                this.loading = false;
            },
            error: (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Erreur lors du chargement des véhicules',
                    life: 3000
                });
                this.loading = false;
            }
        });
        this.carForm = this.formBuilder.group({
            marque: ['', Validators.required],
            modele: ['', Validators.required],
            annee: ['', [Validators.required, Validators.min(1900)]],
            plaqueImmatriculation: ['', Validators.pattern('[0-9]{4} [A-Z]{2,4}')],
            kilometrage: ['', [Validators.required, Validators.min(0)]],
            typeCarburant: ['', Validators.required],
            dateDerniereEntretien: ['', Validators.required],
            dateExpirationAssurance: ['', Validators.required],
            image: ''
        });
    }

    loadDemoData() {
        // this.carsService.getCars().then((data) => {
        //     this.cars.set(data);
        // });

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];

        this.cols = [
            { field: 'code', header: 'Code', customExportHeader: 'Product Code' },
            { field: 'name', header: 'Name' },
            { field: 'image', header: 'Image' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' }
        ];

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew() {
        // this.carForm;
        this.submitted = false;
        this.carDialog = true;
    }

    editCar(car: Car) {
        // this.car = { ...car };
        this.carDialog = true;
    }

    deleteSelectedCars() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.cars.set(this.cars().filter((val) => !this.selectedCars?.includes(val)));
                this.selectedCars = null;
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
        this.carDialog = false;
        this.submitted = false;
    }

    deleteCar(car: Car) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + car.modele + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.cars.set(this.cars().filter((val) => val.id !== car.id));
                // this.car = {};
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
        for (let i = 0; i < this.cars().length; i++) {
            if (this.cars()[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warn';
            case 'OUTOFSTOCK':
                return 'danger';
            default:
                return 'info';
        }
    }

    onSaveCar() {
        const formData = new FormData();
        Object.keys(this.carForm.controls).forEach((key) => {
            formData.append(key, this.carForm.get(key)?.value);
        });
        formData.set('image', this.selectedFileCarForm);
        // formData.set('image', '');
        console.log(formData);
        this.submitted = true;
        let _cars = this.cars();
        this.carsService.addCar(formData).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Véhicule ajouté',
                    life: 3000
                });
            },
            error: () => {}
        });
        // if (this.car.modele?.trim()) {
        //     if (this.car.id) {
        //         _cars[this.findIndexById(this.car.id)] = this.car;
        //         this.cars.set([..._cars]);
        //         this.messageService.add({
        //             severity: 'success',
        //             summary: 'Successful',
        //             detail: 'Product Updated',
        //             life: 3000
        //         });
        //     } else {
        //         this.car.id = this.createId();
        //         this.car.imageUrl = 'product-placeholder.svg';
        //         this.messageService.add({
        //             severity: 'success',
        //             summary: 'Successful',
        //             detail: 'Product Created',
        //             life: 3000
        //         });
        //         this.cars.set([..._cars, this.car]);
        //     }

        //     this.carDialog = false;
        //     // this.car = {};
        // }
    }

    setFileData(event: Event): void {
        const eventTarget: HTMLInputElement | null = event.target as HTMLInputElement | null;
        if (eventTarget?.files?.[0]) {
            const file: File = eventTarget.files[0];
            this.selectedFileCarForm = file;
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                this.carForm.get('image')?.setValue(reader.result as string);
            });
            reader.readAsDataURL(file);
        }
    }
}
