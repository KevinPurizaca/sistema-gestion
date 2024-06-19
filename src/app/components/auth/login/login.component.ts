import { Component, ViewChild } from '@angular/core';
import { LayoutService } from '../../../layout/service/app.layout.service';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonService } from '../../../core/services/common.service';
import { environment } from '../../../../environments/environment';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    providers: [AuthService]
})

export class LoginComponent {

     siteKeyRecaptcha = environment.ClientKeyCaptcha;

    loading: boolean = false;

    @ViewChild('IdCaptcha') IdCaptcha: any;
    isSubmitted: boolean = false;
    returnUrl: string = '/';
    error: boolean = false;
    tokenRecaptcha: string = "";
    tokenCaptchaV2: string = "";
    captchaValido: boolean = false;
    csrfToken: string = '';
    cookie: string = "";


    form: FormGroup = this.fb.group({
        usuario: [, [Validators.required]],
        password: [, [Validators.required]],
        recaptchaReactive: new FormControl(null, Validators.required),
        RequestVerificacionToken: [, null]
    })


    constructor(public layoutService: LayoutService,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private commonService: CommonService,
    ) {

    }


    resolved(captchaResponse: any) {
        this.captchaValido = true;
        this.tokenCaptchaV2 = captchaResponse;
    }

    toBinary(string: string): any {
        const codeUnits = new Uint16Array(string.length);
        for (let i = 0; i < codeUnits.length; i++) {
            codeUnits[i] = string.charCodeAt(i);
        }
        const charCodes = new Uint8Array(codeUnits.buffer);
        let result = '';
        for (let i = 0; i < charCodes.byteLength; i++) {
            result += String.fromCharCode(charCodes[i]);
        }
        return result;
    }

    Encryptar(cadena: string): string {
        const converted = this.toBinary(cadena);
        const encoded = btoa(converted);
        return encoded;
    }

    async login(event: Event) {
        event.preventDefault();
        if (this.form.invalid) {
            for (const control of Object.keys(this.form.controls)) {
                this.form.controls[control].markAsTouched();
            }
            return;
        }


        this.isSubmitted = true;
        this.loading =true;

        const loginValues = this.form.value;
        let paramRequest = {
            login: loginValues['usuario'],
            password: loginValues['password'], Origen: "1"
        };
        await this.authService.loginSecurity(paramRequest, this.tokenCaptchaV2).then((res: any) => {
            if (res.TipoResultado == 1) {
                console.log("🚀  res:", res)
                var usuarioSession = {
                    "Flagproveedor": res.Datos.Flagproveedor,
                    "Flagconfiguracionpersona": res.Datos.Flagconfiguracionpersona,
                    "Login": res.Datos.Login,
                    "Nombre": res.NombreCompleto,
                    "ApellidoPaterno": "",
                    "ApellidoMaterno": "",
                    "Email": res.Datos.Email,
                    "NumeroDocumento": res.NumeroDocumento,
                    "IdCliente": res.Ubicacion.IdCliente,
                    "PermisoPorDefecto": res.PermisoPorDefecto,
                    "IdTipoDocumento": res.IdTipoDocumento,
                    "Telefono": res.Datos.Telefono,
                    "Celular": res.Datos.Celular,
                    "Id": res.Id,
                    "FechaUltimoAcceso": res.FechaUltimoAcceso,

                };

                // var request = {
                //     usuario: usuarioSession,
                //     token: res.token
                // };

                // var encriptdado = this.Encryptar(JSON.stringify(request));
                window.localStorage.setItem("usuarioSession", JSON.stringify(usuarioSession));
                window.localStorage.setItem("accessToken", JSON.stringify(res.token));
                this.loading =false;

                this.router.navigateByUrl("/Registros/Consulta-Registros")
            } else {
                this.commonService.HanddleWarningMessage(res.Mensaje);
                this.IdCaptcha.reset();
            }
            this.isSubmitted = false;
        }, (error: any) => {
            this.IdCaptcha.reset();
            this.isSubmitted = false;
            this.commonService.HanddleWarningMessage(error);
        });
    }





    recuperarRedirect() {
        return this.router.navigate(['/recuperar']);
    }

}
