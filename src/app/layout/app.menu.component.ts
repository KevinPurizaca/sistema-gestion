import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Menu',
                items: [
                    { label: 'Nuevo Registros', icon: 'pi pi-fw pi-home', routerLink: ['Registros/Crear-Registros'] },
                    { label: 'Consulta de Registros', icon: 'pi pi-fw pi-home', routerLink: ['Registros/Consulta-Registros'] },
                ]
            },
        ];
    }
}
