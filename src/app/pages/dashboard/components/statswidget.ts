import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../../service/dashboard.service';
import { AbsolutePipe } from '../../../pipe/absolute/absolute.pipe';

@Component({
    standalone: true,
    selector: 'app-stats-widget',
    imports: [CommonModule, AbsolutePipe],
    template: ` <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Revenu</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ weekRevenue | number: '1.0-0' }} Ar</div>
                    </div>
                    <div class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-dollar text-orange-500 !text-xl"></i>
                    </div>
                </div>
                <ng-container *ngIf="lastWeekRevenue !== 0; else placeholder">
                    <span class="{{ getPercentageIncreaseWeekRevenueColor() }} font-medium">%{{ getPercentageIncreaseWeekRevenue() | number: '1.0-0' | absolute }}{{ getPercentageIncreaseWeekRevenue() >= 0 ? '+' : '-' }} </span>
                    <span class="text-muted-color">par rapport à la semaine dernière</span>
                </ng-container>
                <ng-template #placeholder>
                    <span class="text-transparent">Placeholder</span>
                </ng-template>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Clients</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ customerNumber.totalClients }}</div>
                    </div>
                    <div class="flex items-center justify-center bg-cyan-100 dark:bg-cyan-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-users text-cyan-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">{{ customerNumber.clientsThisWeek }} </span>
                <span class="text-muted-color">nouveaux</span>
            </div>
        </div>`
})
export class StatsWidget implements OnInit {
    weekRevenue: number = 0;
    lastWeekRevenue: number = 0;
    customerNumber: { totalClients: number; clientsThisWeek: number } = { totalClients: 0, clientsThisWeek: 0 };
    constructor(private dashboardService: DashboardService) {}

    ngOnInit() {
        this.dashboardService.getThisWeekRevenue().subscribe((response) => {
            this.weekRevenue = response.data.chiffreAffaireSemaineActuel;
            this.lastWeekRevenue = response.data.chiffreAffaireSemainePrecedente;
        });
        this.dashboardService.getCustomerNumber().subscribe((response) => {
            this.customerNumber = response.data;
        });
    }

    getPercentageIncreaseWeekRevenue() {
        return ((this.weekRevenue - this.lastWeekRevenue) / this.lastWeekRevenue) * 100;
    }

    getPercentageIncreaseWeekRevenueColor() {
        return this.getPercentageIncreaseWeekRevenue() >= 0 ? 'text-primary' : 'text-red-500';
    }
}
