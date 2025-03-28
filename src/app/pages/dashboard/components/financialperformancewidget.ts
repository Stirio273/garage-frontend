import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { debounceTime, max, Subscription } from 'rxjs';
import { LayoutService } from '../../../service/layout.service';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../../../service/dashboard.service';

@Component({
    selector: 'app-financial-performance-widget',
    standalone: true,
    imports: [ChartModule, DropdownModule, FormsModule],
    template: `<div class="card !mb-8">
        <div class="flex justify-between items-center mb-4">
            <div class="font-semibold text-xl mb-4">Chiffre d'affaires (CA) mensuel</div>
            <p-dropdown [options]="anneesDisponibles" [(ngModel)]="anneeSelectionnee" (onChange)="filterData()" placeholder="Sélectionner une année"> </p-dropdown>
        </div>
        <p-chart type="bar" [data]="barData" [options]="barOptions"></p-chart>
    </div>`
})
export class FinancialPerformanceWidget {
    anneeSelectionnee: number = new Date().getFullYear();
    anneesDisponibles = [2022, 2023, 2024];
    barData: any;
    barOptions: any;
    subscription!: Subscription;

    constructor(
        public layoutService: LayoutService,
        private dashboardService: DashboardService
    ) {
        this.subscription = this.layoutService.configUpdate$.pipe(debounceTime(25)).subscribe(() => {
            this.initChart();
        });
    }

    ngOnInit() {
        this.initChart();
    }

    filterData() {
        const documentStyle = getComputedStyle(document.documentElement);
        let data: number[] = [];
        this.dashboardService.getRevenues(this.anneeSelectionnee).subscribe((value) => {
            data = value;
        });
        this.barData = {
            labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
            datasets: [
                {
                    label: `Chiffre d'affaires ${this.anneeSelectionnee}`,
                    backgroundColor: documentStyle.getPropertyValue('--p-primary-500'),
                    borderColor: documentStyle.getPropertyValue('--p-primary-500'),
                    data: data
                }
            ]
        };
    }

    initChart() {
        let data = [];
        this.dashboardService.getRevenues(this.anneeSelectionnee).subscribe((value) => {
            data = value;
        });

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const borderColor = documentStyle.getPropertyValue('--surface-border');
        const textMutedColor = documentStyle.getPropertyValue('--text-color-secondary');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.barData = {
            labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
            datasets: [
                {
                    label: "Chiffre d'affaires",
                    backgroundColor: documentStyle.getPropertyValue('--p-primary-500'),
                    borderColor: documentStyle.getPropertyValue('--p-primary-500'),
                    data: [650000, 590000, 800000, 810000, 560000, 550000, 400000, 1000000, 1250000, 1100000, 1500000, 1300000]
                }
            ]
        };

        this.barOptions = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    },
                    max: 5000000
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
