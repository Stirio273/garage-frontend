import { Component } from '@angular/core';
import { NotificationsWidget } from './components/notificationswidget';
import { StatsWidget } from './components/statswidget';
// import { RecentSalesWidget } from './components/recentsaleswidget';
import { BestSellingWidget } from './components/bestsellingwidget';
import { FinancialPerformanceWidget } from './components/financialperformancewidget';

@Component({
    selector: 'app-dashboard',
    imports: [StatsWidget /*RecentSalesWidget*/, BestSellingWidget, FinancialPerformanceWidget, NotificationsWidget],
    template: `
        <div class="grid grid-cols-12 gap-8">
            <app-stats-widget class="contents" />

            <div class="col-span-12 mb-8">
                <!-- <app-recent-sales-widget /> -->
                <app-best-selling-widget />
            </div>
            <div class="col-span-12">
                <app-financial-performance-widget />
                <!-- <app-notifications-widget /> -->
            </div>
        </div>
    `
})
export class Dashboard {}
