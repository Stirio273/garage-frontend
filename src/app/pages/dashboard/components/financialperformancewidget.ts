import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { debounceTime, map, max, Observable, Subscription } from 'rxjs';
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
    anneesDisponibles = Array.from({ length: 2025 - new Date().getFullYear() + 1 }, (_, i) => 2025 - i);
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

    transformDataToSuitChartConfiguration(data: any[]): number[] {
        const transformedData: number[] = [];
        let monthIndex = 0;

        for (let month = 1; month <= 12; month++) {
            if (monthIndex < data.length && data[monthIndex].month === month) {
                transformedData.push(data[monthIndex].totalAPayer);
                monthIndex++;
            } else {
                transformedData.push(0);
            }
        }

        return transformedData;
    }

    loadRevenues(): Observable<any[]> {
        return this.dashboardService.getRevenues(this.anneeSelectionnee).pipe(map((response) => this.transformDataToSuitChartConfiguration(response.data)));
    }

    filterData() {
        const documentStyle = getComputedStyle(document.documentElement);
        this.loadRevenues().subscribe((data: any[]) => {
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
        });
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const borderColor = documentStyle.getPropertyValue('--surface-border');
        const textMutedColor = documentStyle.getPropertyValue('--text-color-secondary');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.loadRevenues().subscribe((data: any[]) => {
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
        });

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
