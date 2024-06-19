import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthService } from '../components/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    nombreUsuario: string = "";
    userData: any;
    showSidebar: boolean = false;

    @ViewChild('menubutton') menuButton!: ElementRef;
    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,    
        private _authService: AuthService,    
        private router: Router,
    ) {
        const userdata = JSON.parse(window.localStorage.getItem("usuarioSession") || "{}");

        if (userdata) {
            this.userData = userdata;
            this.nombreUsuario = `${userdata.Nombre} ${userdata.ApellidoPaterno || ''} ${userdata.ApellidoMaterno || ''}`;
        }
    }

    showProfileSidebar() {
        this.showSidebar = true;
    }
    logout() {
        this._authService.signOut();
        setTimeout(() => {
            this.router.navigateByUrl('/');
        }, 1000);
    }
}
