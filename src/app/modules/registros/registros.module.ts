import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrosRoutingModule } from './registros-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaRegistrosComponent } from './pages/consulta-registros/consulta-registros.component';
import { RegistrarRegistrosComponent } from './pages/registrar-registros/registrar-registros.component';

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
    RegistrosRoutingModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class RegistrosModule { }
