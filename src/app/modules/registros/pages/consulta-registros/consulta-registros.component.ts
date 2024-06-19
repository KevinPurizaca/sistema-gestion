import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MSG_CRUD, PageEvent, Perfiles, ROWS_DEFAULT, ROWS_OPTIONS } from '../../../../core/config/options';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { HttpCoreService } from '../../../../core/services/httpCore.service';
import { ENDPOINTS } from '../../../../core/config/Endpoints';
import { CommonService } from '../../../../core/services/common.service';

@Component({
  selector: 'app-consulta-registros',
  standalone: false,
  providers:[HttpCoreService],
  templateUrl: './consulta-registros.component.html',
  styleUrl: './consulta-registros.component.scss'
})
export class ConsultaRegistrosComponent implements OnInit {
  dateFechaInicio: Date | undefined;
  dateFechaFin: Date | undefined;


  isCollapsed: boolean = false;
  bDialogRegistrarDetalle: boolean = false;
  bEditarDetalle: boolean = false;

  loading: boolean = true;
  loadingRegistrar: boolean = false;

  
  formBusqueda: FormGroup;
  formRegistro: FormGroup;


  first: number = 0;
  rows: number = ROWS_DEFAULT;
  rowsPageOptions=ROWS_OPTIONS;
  totalRecord:number=0;


  lstRegistros: any[] = [];


  // AUTOCOMPLETABLES

  lstClientes: any[] = [];
  selectedClientes: any;

  lstClientesFiltro: any[] = [];
  selectedClientesFiltro: any;

  lstUsuarios: any[] = [];
  selectedUsuarios: any;


  iPerfilGerente:number =Perfiles.Perfil2;


  request ={
    idCliente: 0,
    codigo: "",
    asunto: "",
    pagina: {
      page: 0,
      pageSize: ROWS_DEFAULT
    }
  }

  requestGuardar ={
    id: 0,
    idCliente: 0,
    asunto: "",
    detalle: "",
    comentarioGerencia: "",
    usuarioRegistro: 0
  }


  constructor(
    fb: FormBuilder,
    fr: FormBuilder,
    private httpCoreService:HttpCoreService,
    private commonService: CommonService,
  ) {
    this.formBusqueda = fb.group({
      cboCliente: [''],
      txtCodigo: [''],
      txtAsunto: [''],
      cboUsuario: [''],
      cboFechaInicio: [-1],
      cboFechaFin: [-1],
    });

    this.formRegistro = fr.group({
      cboCliente: ['', [Validators.required]],
      txtAsunto: ['', [Validators.required]],
      txtDescripcion: ['', [Validators.required]],
      txtComentario: ['']
    });
  }

  ngOnInit(): void {
    this.loadData(this.request);
  }


 

  loadData(req:any){
    this.loading = true;
    this.lstRegistros = [];

    this.httpCoreService.post(req,ENDPOINTS.ListarSeguimiento).subscribe(res => {
      if (res.success){
        this.lstRegistros = res.body;
        this.totalRecord = res.totalRecord;
      }
      this.loading = false;
    })
  }


  guardarRegistro() {

    for (let c in this.formRegistro.controls) {
      this.formRegistro.controls[c].markAsTouched();
    }

    console.log("🚀  this.formRegistro:", this.formRegistro.value)

    if(this.formRegistro.valid){
      this.loadingRegistrar = true;
      const value = this.formRegistro.value;
      this.requestGuardar.idCliente = value.cboCliente.id;
      this.requestGuardar.asunto = value.txtAsunto;
      this.requestGuardar.detalle = value.txtDescripcion;
      this.requestGuardar.usuarioRegistro = 8829;
      
      console.log("🚀   this.requestGuardar:",  this.requestGuardar);

      this.httpCoreService.post(this.requestGuardar,ENDPOINTS.RegistrarSeguimiento).subscribe(res => {
        if(res.success){
          this.request.pagina.page = 0;
          this.commonService.HanddleInfoMessage(MSG_CRUD.MsgActualizadaRegistrada);
          this.loadData(this.request);
          this.loadingRegistrar = false;
          this.bDialogRegistrarDetalle = false;
        }
      })
    }
  }
  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;

    this.request.pagina.page = event.page;
    this.request.pagina.pageSize = event.rows;
    this.loadData(this.request);
  }

  collapsedChange(event: any) {
    this.isCollapsed = event;
  }

  

  showModal(item: any, caso: string) {
  console.log("🚀  item:", item)

    if (caso == "Registrar") {
      this.bEditarDetalle = false;
      this.bDialogRegistrarDetalle = true;
    }
    else if (caso == "Ver-Detalle") {
      this.requestGuardar.idCliente = item.idCliente;
      this.requestGuardar.asunto =item.asunto;
      this.requestGuardar.detalle = item.detalle;
      this.requestGuardar.usuarioRegistro = item.usuarioRegistro;
      this.requestGuardar.comentarioGerencia = item.comentarioGerencia;

      this.httpCoreService.get( `${ENDPOINTS.ObtenerClientes}Cliente=${item.cliente}`).subscribe(res => {
        if(res.success){
          this.selectedClientes = res.body[0];        
        }
      })

      this.bEditarDetalle = true;
      this.bDialogRegistrarDetalle = true;
    }
  }

  

  //#region  AUTOCOMPLETABLES

  filtrarClientesFiltro(event: AutoCompleteCompleteEvent) {
    const params = new URLSearchParams();

    if (event.query != "") params.append('Cliente',event.query);
  
      this.httpCoreService.get( `${ENDPOINTS.ObtenerClientes}${params.toString()}`).subscribe(res => {
        if(res.success){
          this.lstClientesFiltro = res.body;        
        }
      })
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

  filtrarUsuarios(event: AutoCompleteCompleteEvent) {
    const params = new URLSearchParams();

    if (event.query != "") params.append('Usuario',event.query);
  
      this.httpCoreService.get( `${ENDPOINTS.ObtenerUsuarios}${params.toString()}`).subscribe(res => {
        if(res.success){
          this.lstUsuarios = res.body;        
        }
      })
  }

  //#endregion
}
