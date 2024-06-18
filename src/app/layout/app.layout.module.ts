import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { AppMenuComponent } from './app.menu.component';
import { AppMenuitemComponent } from './app.menuitem.component';
import { RouterModule } from '@angular/router';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';
import { AppConfigModule } from './config/config.module';
import { AppSidebarComponent } from "./app.sidebar.component";
import { AppLayoutComponent } from "./app.layout.component";
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        AppMenuitemComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppMenuComponent,
        AppSidebarComponent,
        AppLayoutComponent,
    ],
    imports: [
        CommonModule,
        
        InputTextModule,
        SidebarModule,
        RouterModule,
        AppConfigModule
    ],
    exports: [AppLayoutComponent]
})
export class AppLayoutModule { }

