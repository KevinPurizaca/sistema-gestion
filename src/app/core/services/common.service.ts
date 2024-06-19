import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  tiempoVidaNotificacion: number = 1500;
  closable:boolean =false;

  constructor(
    private messageService: MessageService
  ) { }

  public HanddleErrorMessage(msg: any) {
    this.messageService.add({
        key: 'tst',
        severity: 'error',
        summary: 'Error Message',
        detail: msg,
        closable: this.closable,
        life: this.tiempoVidaNotificacion,
    });
}

public HanddleInfoMessage(msg: any) {
    this.messageService.add({
        key: 'tst',
        severity: 'info',
        summary: 'Confirmado',
        detail: msg,
        closable: this.closable,
        life: this.tiempoVidaNotificacion,
    });
}

public HanddleSuccessMessage(msg: any) {
    this.messageService.add({
        key: 'tst',
        severity: 'success',
        summary: '',
        detail: msg,
        closable: this.closable,
        life: this.tiempoVidaNotificacion,
    });
}

public HanddleWarningMessage(msg: any) {
    this.messageService.add({
        key: 'tst',
        severity: 'warn',
        summary: 'Cuidado',
        detail: msg,
        closable: this.closable,
        life: this.tiempoVidaNotificacion,
    });
}

public HanddleContrasteMessage(msg: any) {
    this.messageService.add({
        key: 'tst',
        severity: 'contrast',
        summary: 'Error',
        detail: msg,
        closable: this.closable,
        life: this.tiempoVidaNotificacion,
    });
}

public HanddleSecondaryMessage(msg: any) {
    this.messageService.add({
        key: 'tst',
        severity: 'secondary',
        summary: 'Cuidado',
        detail: msg,
        closable: this.closable,
        life: this.tiempoVidaNotificacion,
    });
}



 
  
  
}
