import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KeysLocalStorage, MSG_CRUD, PageEvent, Perfiles, ROWS_DEFAULT, ROWS_OPTIONS } from '../../../../core/config/options';
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
  bSubmited: boolean = false;

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


  iPerfilGerente:number =Perfiles.PerfilGerente;
  bPerfilGerente:boolean = false;

  request ={
    idCliente: 0,
    codigo: "",
    asunto: "",
    UsuarioRegistro:0,
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

  usuario_data:any;

  widthModal:string="";
  heigthModal:string="";
  tituloModal:string="";

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

    this.usuario_data = JSON.parse(window.localStorage.getItem(KeysLocalStorage.InfoUsuario) || "{}");
    if(this.usuario_data){
      this.bPerfilGerente = this.usuario_data?.Perfiles.filter((x:any) => x.id === Perfiles.PerfilGerente || x.perfil === "GERENTE").length > 0;
    }
  }


  mostrarmsg(){
    this.commonService.HanddleInfoMessage(MSG_CRUD.MsgActualizadaRegistrada);

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

    this.bSubmited = true;
    
    for (let c in this.formRegistro.controls) {
      this.formRegistro.controls[c].markAsTouched();
    }


    if(this.formRegistro.valid){//Validamos si el formulario es valido
      this.loadingRegistrar = true;
      const value = this.formRegistro.value;

      if(this.bEditarDetalle  && value.txtComentario == ""){//Vaidamos si va a registrar el comentario
        this.commonService.HanddleWarningMessage(MSG_CRUD.MsgAgregarComentario);
        this.loadingRegistrar = false;
        return;
      }
      
      this.requestGuardar.idCliente = value.cboCliente.id;
      this.requestGuardar.asunto = value.txtAsunto;
      this.requestGuardar.detalle = value.txtDescripcion;
      

      this.httpCoreService.post(this.requestGuardar,ENDPOINTS.RegistrarSeguimiento).subscribe(res => {
        if(res.success){
          this.request.pagina.page = 0;//Reseteamos el page
          this.commonService.HanddleInfoMessage(MSG_CRUD.MsgActualizadaRegistrada);
          this.loadData(this.request);//Recargamos la lista
          this.loadingRegistrar = false;//ocultamps el loading del boton enviar
          this.bDialogRegistrarDetalle = false;//cerramos el modal
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
    this.isCollapsed = event;//para cuando se usa el componente panel
  }


  

  showModal(item: any, caso: string) {
    this.bSubmited =false;
    this.loadingRegistrar = false;

    if (caso == "Registrar") {
      this.bEditarDetalle = false;
      this.requestGuardar.id = 0;
      this.requestGuardar.idCliente = 0;
      this.requestGuardar.asunto ="";
      this.requestGuardar.detalle = "";
      this.requestGuardar.usuarioRegistro = this.usuario_data.Id;//Toma el id del usuario guardado en el local storage
      this.requestGuardar.comentarioGerencia = "";
      this.selectedClientes = undefined;

      this.widthModal  ="600px";
      this.heigthModal ="550px";
      this.tituloModal ="Nuevo Registro";

      this.bDialogRegistrarDetalle = true;

    }
    else if (caso == "Ver-Detalle") {
      this.bEditarDetalle = true;
      this.requestGuardar.id = item.id;
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
      this.widthModal  ="600px";
      this.heigthModal = this.bPerfilGerente ? "1000px" :"550px";
      this.tituloModal ="Agregar Comentario";

      this.bDialogRegistrarDetalle = true;
    }
  }

  buscarRegistro(){
    const value = this.formBusqueda.value;
    this.request.asunto = value.txtAsunto || "";
    this.request.codigo = value.txtCodigo || "";
    this.request.idCliente = value.cboCliente?.id || 0;
    this.request.UsuarioRegistro = value.cboUsuario?.id|| 0;
    this.request.pagina.page = 0;
    this.request.pagina.pageSize = ROWS_DEFAULT;
    this.first = 0;
    this.rows = ROWS_DEFAULT;
    this.loadData(this.request);
  }

  
  limpiar(){
    this.formBusqueda.reset();//Reseteamos el formulario

    const value = this.formBusqueda.value;
    this.request.asunto = value.txtAsunto || "";
    this.request.codigo = value.txtCodigo || "";
    this.request.idCliente =  0;
    this.request.UsuarioRegistro =  0;
    this.request.pagina.page = 0;
    this.request.pagina.pageSize = ROWS_DEFAULT;
    this.first = 0;
    this.rows = ROWS_DEFAULT;

    
    this.loadData(this.request);
  }

  //#region  AUTOCOMPLETABLES


  filtrarClientes(event: AutoCompleteCompleteEvent,caso:string) {
    const params = new URLSearchParams();

    if (event.query != "") params.append('Cliente',event.query);
  
      this.httpCoreService.get( `${ENDPOINTS.ObtenerClientes}${params.toString()}`).subscribe(res => {
        if(res.success){
          if(caso == "Filtros"){
            this.lstClientesFiltro = res.body;        
          }
          else if(caso == "Registrar"){
            this.lstClientes = res.body;        
          }
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
