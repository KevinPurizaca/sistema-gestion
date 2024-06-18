import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrosRoutingModule } from './registros-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaRegistrosComponent } from './pages/consulta-registros/consulta-registros.component';
import { RegistrarRegistrosComponent } from './pages/registrar-registros/registrar-registros.component';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AutoCompleteModule } from 'primeng/autocomplete';


const routes: Routes = [
  { path: 'Consulta-Registros' , component:ConsultaRegistrosComponent }  ,
  { path: 'Crear-Registros' , component:RegistrarRegistrosComponent }  ,

]

@NgModule({
  declarations: [
    ConsultaRegistrosComponent,
    RegistrarRegistrosComponent,               
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RegistrosRoutingModule,
    PanelModule,
    TableModule,
    ButtonModule,
    PaginatorModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    InputTextareaModule,
    AutoCompleteModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class RegistrosModule { }
