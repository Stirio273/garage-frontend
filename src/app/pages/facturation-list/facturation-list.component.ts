import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FacturationService } from '../../service/facturation.service';
import { Facture } from '../../model/facture';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SelectModule } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { Router } from '@angular/router';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    selector: 'app-facturation-list',
    imports: [
        TableModule,
        MultiSelectModule,
        SelectModule,
        InputIconModule,
        TagModule,
        InputTextModule,
        SliderModule,
        ProgressBarModule,
        ToggleButtonModule,
        ToastModule,
        CommonModule,
        FormsModule,
        ButtonModule,
        RatingModule,
        RippleModule,
        IconFieldModule,
        CalendarModule
    ],
    templateUrl: './facturation-list.component.html',
    styleUrl: './facturation-list.component.scss'
})
export class FacturationListComponent implements OnInit {
    factures: Facture[] = [];
    selectedFactures: Facture[] = [];
    selectedFacture: Facture = {};
    representatives: any[] = [];
    statuses: any[] = [];
    rowGroupMetadata: any;
    expandedRows: expandedRows = {};
    activityValues: number[] = [0, 100];
    isExpanded: boolean = false;
    balanceFrozen: boolean = false;
    loading: boolean = true;
    selectedTime: string | null = null;
    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private facturationService: FacturationService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.loading = false;
        this.facturationService.getFactures().subscribe((response) => {
            this.factures = response.data;
            this.loading = false;
            // @ts-ignore
            this.factures.forEach((facture) => {
                facture.dateHeureFacture = new Date(facture.dateHeureFacture as Date);
                facture.status = this.getStatusValue(facture);
            });
        });

        this.representatives = [
            { name: 'Amy Elsner', image: 'amyelsner.png' },
            { name: 'Anna Fali', image: 'annafali.png' },
            { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
            { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
            { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
            { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
            { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
            { name: 'Onyama Limba', image: 'onyamalimba.png' },
            { name: 'Stephen Shaw', image: 'stephenshaw.png' },
            { name: 'XuXue Feng', image: 'xuxuefeng.png' }
        ];

        this.statuses = [
            { label: 'Payé', value: 'Payé' },
            { label: 'En cours de paiement', value: 'En cours de paiement' },
            { label: 'Non payé', value: 'Non payé' }
        ];
    }

    payer(idFacture: string) {
        this.router.navigate([`/pages/facturation/payer/${idFacture}`]);
    }

    onSort() {
        this.updateRowGroupMetaData();
    }

    updateRowGroupMetaData() {
        this.rowGroupMetadata = {};

        // if (this.customers3) {
        //     for (let i = 0; i < this.customers3.length; i++) {
        //         const rowData = this.customers3[i];
        //         const representativeName = rowData?.representative?.name || '';

        //         if (i === 0) {
        //             this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
        //         } else {
        //             const previousRowData = this.customers3[i - 1];
        //             const previousRowGroup = previousRowData?.representative?.name;
        //             if (representativeName === previousRowGroup) {
        //                 this.rowGroupMetadata[representativeName].size++;
        //             } else {
        //                 this.rowGroupMetadata[representativeName] = { index: i, size: 1 };
        //             }
        //         }
        //     }
        // }
    }

    expandAll() {
        if (!this.isExpanded) {
            // this.products.forEach((product) => (product && product.name ? (this.expandedRows[product.name] = true) : ''));
        } else {
            this.expandedRows = {};
        }
        this.isExpanded = !this.isExpanded;
    }

    formatCurrency(value: number) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    filterByTime(options: any) {
        if (this.selectedTime) {
            options.filter(this.selectedTime, 'heure', 'equals');
        }
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    getStatusValue(facture: Facture) {
        if (facture.TotalAPayer == facture.paiementEffectue) {
            return 'Payé';
        } else if ((facture.TotalAPayer as number) > (facture.paiementEffectue as number) && (facture.paiementEffectue as number) > 0) {
            return 'En cours de paiement';
        } else {
            return 'Non payé';
        }
    }

    getSeverity(status: string) {
        switch (status) {
            case 'Payé':
                return 'success';

            case 'En cours de paiement':
                return 'warn';

            case 'Non payé':
                return 'danger';

            default:
                return 'info';
        }
    }

    calculateCustomerTotal(name: string) {
        let total = 0;

        // if (this.customers2) {
        //     for (let customer of this.customers2) {
        //         if (customer.representative?.name === name) {
        //             total++;
        //         }
        //     }
        // }

        return total;
    }
}
