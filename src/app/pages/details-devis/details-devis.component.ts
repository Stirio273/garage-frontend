import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { Router, NavigationEnd } from '@angular/router';
import { Car } from '../../model/car';

interface QuoteService {
    designation: string;
    quantity: number;
    unitPrice: number;
    amount: number;
}

@Component({
    selector: 'app-details-devis',
    standalone: true,
    imports: [CommonModule, TableModule, CardModule, DividerModule],
    templateUrl: './details-devis.component.html',
    styleUrl: './details-devis.component.scss'
})
export class DetailsDevisComponent implements OnInit {
    quoteNumber: string = '003/2018';
    customerInfo: string = '';
    services: QuoteService[] = [];
    selectedCar: Car | null = null;
    notes: string = '';

    constructor(private router: Router) {
        // Get the navigation state
        const navigation = this.router.getCurrentNavigation();
        if (navigation?.extras.state) {
            const state = navigation.extras.state as any;
            this.services = state.services || [];
            this.selectedCar = state.car || null;
            this.notes = state.notes || '';

            // Set customer info from car details
            if (this.selectedCar) {
                this.customerInfo = `${this.selectedCar.marque} ${this.selectedCar.modele} - ${this.selectedCar.plaqueImmatriculation}`;
            }
        }
    }

    ngOnInit() {
        // If no data was passed, redirect back to the form
        if (this.services.length === 0) {
            this.router.navigate(['/pages/demande-devis']);
        }
    }

    getTotalHT(): number {
        return this.services.reduce((total, service) => total + service.amount, 0);
    }

    getTVA(): number {
        return 0.2;
    }

    getTotalTTC(): number {
        return this.getTotalHT() + this.getTVA();
    }

    // Convert number to words in French
    numberToWords(num: number): string {
        const units = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf'];
        const teens = ['dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];
        const tens = ['', 'dix', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingt', 'quatre-vingt-dix'];

        const convertLessThanThousand = (n: number): string => {
            if (n === 0) return '';

            let words = '';

            if (n >= 100) {
                if (Math.floor(n / 100) === 1) {
                    words += 'cent ';
                } else {
                    words += units[Math.floor(n / 100)] + ' cent ';
                }
                n %= 100;
            }

            if (n >= 10 && n < 20) {
                words += teens[n - 10] + ' ';
                return words.trim();
            }

            if (n >= 20) {
                words += tens[Math.floor(n / 10)] + ' ';
                n %= 10;
            }

            if (n > 0) {
                words += units[n] + ' ';
            }

            return words.trim();
        };

        if (num === 0) return 'zéro';

        let words = '';
        let remainder = num;

        if (remainder >= 1000000) {
            const millions = Math.floor(remainder / 1000000);
            if (millions === 1) {
                words += 'un million ';
            } else {
                words += convertLessThanThousand(millions) + ' millions ';
            }
            remainder %= 1000000;
        }

        if (remainder >= 1000) {
            const thousands = Math.floor(remainder / 1000);
            if (thousands === 1) {
                words += 'mille ';
            } else {
                words += convertLessThanThousand(thousands) + ' mille ';
            }
            remainder %= 1000;
        }

        if (remainder > 0) {
            words += convertLessThanThousand(remainder);
        }

        return words.trim().charAt(0).toUpperCase() + words.trim().slice(1);
    }
}
