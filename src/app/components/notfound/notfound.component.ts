import { Component } from '@angular/core';
import { KeysLocalStorage } from '../../core/config/options';

@Component({
    selector: 'app-notfound',
    templateUrl: './notfound.component.html',
})
export class NotfoundComponent { 

    constructor(){
        this.goToHome();
    }

    urlRegresar:string='';
    goToHome():void{

        let token :any= window.localStorage.getItem(KeysLocalStorage.Token);
        if (token == null || token=='' ) {
            this.urlRegresar = '#/login';   
        } else {
            this.urlRegresar = '#/Registros/Consulta-Registros';
       }
    }
}