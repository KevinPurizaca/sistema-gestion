import { Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';


export const routes: Routes = [
   {
        path: '', component: AppLayoutComponent,
        children: [
            { path: '', loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule) },
        ]
    },
   {
        path: '', component: AppLayoutComponent,
        children: [
            { path: 'Registros', loadChildren: () => import('./modules/registros/registros.module').then(m => m.RegistrosModule) },
        ]
    },
    { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) },
    { path: 'notfound', component: NotfoundComponent },
    { path: '**', redirectTo: '/notfound' },
];
