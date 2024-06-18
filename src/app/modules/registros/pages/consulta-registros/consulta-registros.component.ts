import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '../../../../core/config/options';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

@Component({
  selector: 'app-consulta-registros',
  standalone: false,
  templateUrl: './consulta-registros.component.html',
  styleUrl: './consulta-registros.component.scss'
})
export class ConsultaRegistrosComponent implements OnInit {
  isCollapsed: boolean = false;
  bDialogRegistrarDetalle: boolean = false;

  formBusqueda: FormGroup;
  formRegistro: FormGroup;

  first: number = 0;
  rows: number = 10;



  lstClientes: any[] | undefined;
  selectedClientes: any;
  filtroClientes: any[] = [];

  constructor(
    fb: FormBuilder,
    fr: FormBuilder,

  ) {
    this.formBusqueda = fb.group({
      // txtUsuario: [''],
      txtNombre: [''],
      txtApellidoPaterno: [''],
      txtApellidoMaterno: [''],
      txtNroDocumento: [''],
      cboEstado: [-1],
      cboPerfil: [-1],
      cboTipoDocumento: [-1],
    });

    this.formRegistro = fr.group({
      cboCliente: ['', [Validators.required]],
      txtAsunto: ['', [Validators.required]],
      txtDescripcion: ['', [Validators.required]],
      txtComentario: ['']
    });
  }

  lstRegistros: any[] = [
    { id: 1, fecha: "01/01/2023", cliente: "Juan Pérez", registradoPor: "Ana Gómez", asunto: "Reunión inicial" },
    { id: 2, fecha: "05/01/2023", cliente: "María Rodríguez", registradoPor: "Carlos Sánchez", asunto: "Presentación del proyecto" },
    { id: 3, fecha: "10/02/2023", cliente: "Luis Hernández", registradoPor: "Laura Martínez", asunto: "Revisión de contrato" },
    { id: 4, fecha: "15/03/2023", cliente: "Ana Fernández", registradoPor: "David López", asunto: "Firma de acuerdo" },
    { id: 5, fecha: "20/04/2023", cliente: "Pedro Ramírez", registradoPor: "Sofía González", asunto: "Entrega de productos" },
    { id: 6, fecha: "25/05/2023", cliente: "Elena Díaz", registradoPor: "Jorge Torres", asunto: "Revisión de progreso" },
    { id: 7, fecha: "30/06/2023", cliente: "Miguel Castillo", registradoPor: "Lucía Moreno", asunto: "Encuesta de satisfacción" },
    { id: 8, fecha: "10/07/2023", cliente: "Laura Morales", registradoPor: "Roberto Ruiz", asunto: "Actualización del proyecto" },
    { id: 9, fecha: "15/08/2023", cliente: "Ricardo Pérez", registradoPor: "Andrea Gutiérrez", asunto: "Cierre del proyecto" },
    { id: 10, fecha: "20/09/2023", cliente: "Marta Sánchez", registradoPor: "Pablo García", asunto: "Reunión de seguimiento" }
  ];



  ngOnInit(): void {

  }

  collapsedChange(event: any) {
    this.isCollapsed = event;
  }



  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  showModal(item: any, caso: string) {
    console.log("🚀  caso:", caso)
    console.log("🚀  item:", item)
    if (caso == "Registrar") {
      this.bDialogRegistrarDetalle = true;
    }
    else if (caso == "Ver-Detalle") {
      let item2 = item;
      this.bDialogRegistrarDetalle = true;
    }
  }

  guardarRegistro() {

    for (let c in this.formRegistro.controls) {
      this.formRegistro.controls[c].markAsTouched();
    }
  }

  filtrarClientes(event: AutoCompleteCompleteEvent) {
  console.log("🚀  event:", event)

  }
}
