import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../../core/services/common.service';
import { HttpCoreService } from '../../../../core/services/httpCore.service';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { ENDPOINTS } from '../../../../core/config/Endpoints';
import { MSG_CRUD } from '../../../../core/config/options';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-registros',
  standalone: false,
  providers:[HttpCoreService],
  templateUrl: './registrar-registros.component.html',
  styleUrl: './registrar-registros.component.scss'
})
export class RegistrarRegistrosComponent {
  formRegistro: FormGroup;
  loadingRegistrar: boolean = false;

  lstClientes: any[] = [];
  selectedClientes: any;

  requestGuardar ={
    id: 0,
    idCliente: 0,
    asunto: "",
    detalle: "",
    comentarioGerencia: "",
    usuarioRegistro: 0
  }

  constructor(
    fr: FormBuilder,
    private httpCoreService:HttpCoreService,
    private commonService: CommonService,
    private router:Router
  ){
    this.formRegistro = fr.group({
      cboCliente: ['', [Validators.required]],
      txtAsunto: ['', [Validators.required]],
      txtDescripcion: ['', [Validators.required]],
      txtComentario: ['']
    });
  }


  guardarRegistro() {

    for (let c in this.formRegistro.controls) {
      this.formRegistro.controls[c].markAsTouched();
    }


    if(this.formRegistro.valid){
      this.loadingRegistrar = true;
      const value = this.formRegistro.value;
      this.requestGuardar.idCliente = value.cboCliente.id;
      this.requestGuardar.asunto = value.txtAsunto;
      this.requestGuardar.detalle = value.txtDescripcion;
      this.requestGuardar.usuarioRegistro = 8829;
      

      this.httpCoreService.post(this.requestGuardar,ENDPOINTS.RegistrarSeguimiento).subscribe(res => {
        if(res.success){
          this.commonService.HanddleInfoMessage(MSG_CRUD.MsgActualizadaRegistrada);
          this.loadingRegistrar = false;
          this.router.navigateByUrl("/Registros/Consulta-Registros")
        }
      })
    }
  }


  filtrarClientes(event: AutoCompleteCompleteEvent) {
    const params = new URLSearchParams();

    if (event.query != "") params.append('Cliente',event.query);
  
      this.httpCoreService.get( `${ENDPOINTS.ObtenerClientes}${params.toString()}`).subscribe(res => {
        if(res.success){
          this.lstClientes = res.body;        
        }
      })
  }

}
