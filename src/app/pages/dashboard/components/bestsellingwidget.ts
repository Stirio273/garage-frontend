import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { DashboardService } from '../../../service/dashboard.service';

@Component({
    standalone: true,
    selector: 'app-best-selling-widget',
    imports: [CommonModule, ButtonModule, MenuModule],
    template: ` <div class="card">
        <div class="flex justify-between items-center mb-6">
            <div class="font-semibold text-xl">Services les plus demandés</div>
            <div>
                <button pButton type="button" icon="pi pi-ellipsis-v" class="p-button-rounded p-button-text p-button-plain" (click)="menu.toggle($event)"></button>
                <p-menu #menu [popup]="true" [model]="items"></p-menu>
            </div>
        </div>
        <ul class="list-none p-0 m-0">
            <li class="flex flex-col md:flex-row md:items-center md:justify-between mb-6" *ngFor="let service of top5Services; let i = index">
                <div>
                    <span class="text-surface-900 dark:text-surface-0 font-medium mr-2 mb-1 md:mb-0">{{ service._id }}</span>
                    <div class="mt-1 text-muted-color">{{ service.count }} demandes</div>
                </div>
                <div class="mt-2 md:mt-0 flex items-center">
                    <div class="bg-surface-300 dark:bg-surface-500 rounded-border overflow-hidden w-40 lg:w-24" style="height: 8px">
                        <div class="h-full" [ngClass]="getProgressBarColor(i)" style="width: {{ service.percentage | number: '1.0-2' }}%"></div>
                    </div>
                    <span class="ml-4 font-medium" [ngClass]="getTextColor(i)">{{ service.percentage | number: '1.0-2' }}%</span>
                </div>
            </li>
            <!-- <li class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                    <span class="text-surface-900 dark:text-surface-0 font-medium mr-2 mb-1 md:mb-0">Remplacement batterie</span>
                    <div class="mt-1 text-muted-color">Réparation</div>
                </div>
                <div class="mt-2 md:mt-0 ml-0 md:ml-20 flex items-center">
                    <div class="bg-surface-300 dark:bg-surface-500 rounded-border overflow-hidden w-40 lg:w-24" style="height: 8px">
                        <div class="bg-cyan-500 h-full" style="width: 67%"></div>
                    </div>
                    <span class="text-cyan-500 ml-4 font-medium">%67</span>
                </div>
            </li>
            <li class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                    <span class="text-surface-900 dark:text-surface-0 font-medium mr-2 mb-1 md:mb-0">Freins et plaquettes</span>
                    <div class="mt-1 text-muted-color">Entretien</div>
                </div>
                <div class="mt-2 md:mt-0 ml-0 md:ml-20 flex items-center">
                    <div class="bg-surface-300 dark:bg-surface-500 rounded-border overflow-hidden w-40 lg:w-24" style="height: 8px">
                        <div class="bg-pink-500 h-full" style="width: 50%"></div>
                    </div>
                    <span class="text-pink-500 ml-4 font-medium">%50</span>
                </div>
            </li>
            <li class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                    <span class="text-surface-900 dark:text-surface-0 font-medium mr-2 mb-1 md:mb-0">Diagnostic général</span>
                    <div class="mt-1 text-muted-color">Diagnostic</div>
                </div>
                <div class="mt-2 md:mt-0 ml-0 md:ml-20 flex items-center">
                    <div class="bg-surface-300 dark:bg-surface-500 rounded-border overflow-hidden w-40 lg:w-24" style="height: 8px">
                        <div class="bg-green-500 h-full" style="width: 35%"></div>
                    </div>
                    <span class="text-primary ml-4 font-medium">%35</span>
                </div>
            </li>
            <li class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                    <span class="text-surface-900 dark:text-surface-0 font-medium mr-2 mb-1 md:mb-0">Changement pneus</span>
                    <div class="mt-1 text-muted-color">Réparation</div>
                </div>
                <div class="mt-2 md:mt-0 ml-0 md:ml-20 flex items-center">
                    <div class="bg-surface-300 dark:bg-surface-500 rounded-border overflow-hidden w-40 lg:w-24" style="height: 8px">
                        <div class="bg-purple-500 h-full" style="width: 16%"></div>
                    </div>
                    <span class="text-purple-500 ml-4 font-medium">%16</span>
                </div>
            </li> -->
        </ul>
    </div>`
})
export class BestSellingWidget implements OnInit {
    top5Services: { _id: string; count: number; percentage: number }[] = [];
    private colors = [
        { progress: 'bg-orange-500', text: 'text-orange-500' },
        { progress: 'bg-cyan-500', text: 'text-cyan-500' },
        { progress: 'bg-pink-500', text: 'text-pink-500' },
        { progress: 'bg-green-500', text: 'text-green-500' },
        { progress: 'bg-purple-500', text: 'text-purple-500' }
    ];

    constructor(private dashboardService: DashboardService) {}

    ngOnInit(): void {
        this.dashboardService.getTop5Services().subscribe((response) => {
            this.top5Services = response.data.topServices;
        });
    }

    getProgressBarColor(index: number): string {
        return this.colors[index % this.colors.length].progress;
    }

    getTextColor(index: number): string {
        return this.colors[index % this.colors.length].text;
    }

    menu = null;

    items = [
        { label: 'Ajouter', icon: 'pi pi-fw pi-plus' },
        { label: 'Retirer', icon: 'pi pi-fw pi-trash' }
    ];
}
