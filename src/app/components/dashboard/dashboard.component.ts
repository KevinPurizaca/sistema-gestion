import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from '../../layout/service/app.layout.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

    items!: MenuItem[];

    products!: any[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    constructor(public layoutService: LayoutService) {
        this.subscription = this.layoutService.configUpdate$
        .pipe(debounceTime(25))
        .subscribe((config) => {
      
        });
    }

    ngOnInit() {

    }  
}
