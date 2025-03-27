import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';

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
export class DetailsDevisComponent {
    quoteNumber: string = '003/2018';
    customerInfo: string = 'RMA WATANIYA- ASSURANCE Isayoure';
    services: QuoteService[] = [
        {
            designation: 'C.ext Moteur',
            quantity: 1,
            unitPrice: 1200.0,
            amount: 1200.0
        },
        {
            designation: 'C.ext droite',
            quantity: 1,
            unitPrice: 500.0,
            amount: 500.0
        },
        {
            designation: 'pare choc avant',
            quantity: 1,
            unitPrice: 1800.0,
            amount: 1800.0
        },
        {
            designation: 'Support côté droite',
            quantity: 1,
            unitPrice: 100.0,
            amount: 100.0
        },
        {
            designation: 'Parabole côté droite',
            quantity: 1,
            unitPrice: 600.0,
            amount: 600.0
        },
        {
            designation: 'Garniture Avant Du capot',
            quantity: 1,
            unitPrice: 600.0,
            amount: 600.0
        },
        {
            designation: 'Baguette sous Parabole',
            quantity: 1,
            unitPrice: 100.0,
            amount: 100.0
        },
        {
            designation: "Réservoir d'eau lave glace",
            quantity: 1,
            unitPrice: 200.0,
            amount: 200.0
        },
        {
            designation: 'Traverse Avant',
            quantity: 1,
            unitPrice: 500.0,
            amount: 500.0
        }
        // },
        // {
        //     designation: "Main d'oeuvre",
        //     quantity: 1,
        //     unitPrice: 1500.0,
        //     amount: 1500.0
        // }
    ];

    getTotalHT(): number {
        return this.services.reduce((total, service) => total + service.amount, 0);
    }

    getTVA(): number {
        return 0; // In this case TVA is 0 as shown in the image
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
