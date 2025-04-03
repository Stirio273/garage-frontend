import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FacturationService } from '../../service/facturation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-paiement',
    standalone: true,
    imports: [CommonModule, FormsModule, CardModule, InputTextModule, ButtonModule, DropdownModule, CalendarModule, InputNumberModule, ToastModule],
    providers: [MessageService],
    templateUrl: './paiement.component.html',
    styleUrl: './paiement.component.scss'
})
export class PaiementComponent {
    montant: number | null = null;
    datePaiement: Date = new Date();
    modePaiement: string = '';
    reference: string = '';
    factureId: string = '';

    modesPaiement = [
        { label: 'Espèces', value: 'especes' },
        { label: 'Carte bancaire', value: 'carte' },
        { label: 'Virement', value: 'virement' },
        { label: 'Chèque', value: 'cheque' }
    ];

    constructor(
        private messageService: MessageService,
        private facturationService: FacturationService,
        private route: ActivatedRoute
    ) {}

    getPaymentIcon(mode: string): string {
        switch (mode) {
            case 'especes':
                return 'money-bill';
            case 'carte':
                return 'credit-card';
            case 'virement':
                return 'bank';
            case 'cheque':
                return 'file';
            default:
                return 'money-bill';
        }
    }

    submitPaiement() {
        if (!this.montant) {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreur',
                detail: 'Veuillez remplir tous les champs obligatoires'
            });
            return;
        }

        // // Here you would typically call your payment service
        // console.log('Payment submitted:', {
        //     montant: this.montant,
        //     datePaiement: this.datePaiement,
        //     modePaiement: this.modePaiement,
        //     reference: this.reference
        // });

        this.factureId = this.route.snapshot.params['idFacture'];

        this.facturationService.payerFacture(this.factureId, this.montant).subscribe((response) => {
            console.log(response);
            this.messageService.add({
                severity: 'success',
                summary: 'Succès',
                detail: 'Paiement enregistré avec succès'
            });
        });

        // Reset form
        this.resetForm();
    }

    resetForm() {
        this.montant = null;
        this.datePaiement = new Date();
        this.modePaiement = '';
        this.reference = '';
    }
}
