import { Component, ViewChild } from '@angular/core';
import { LayoutService } from '../../../layout/service/app.layout.service';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl:'./login.component.scss', 
})
export class LoginComponent {


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
        // private authService: AuthService,
        // private cookieService: CookieService,
        // private store: Store
    ) {

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
    
        const loginValues = this.form.value;
        let paramRequest = {
          login: loginValues['usuario'], 
          password: loginValues['password'], Origen: "1"
        };
       /* await this.authService.loginSecurity(paramRequest, this.tokenCaptchaV2).then((res: any) => {
          if (res.TipoResultado == 1) {
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
            var request = {
              usuario: usuarioSession,
              token: res.token
            };
            // var encriptdado = this.Encryptar(JSON.stringify(request));
            // this.store.dispatch(AuthActions.getUsuario({usuario:usuarioSession}));
            window.sessionStorage.setItem("usuarioSession",JSON.stringify(usuarioSession));
            // this.router.navigate(['/dashboard', encriptdado])
          } else {
            // this.bootstrapNotifyBarService.notifyDanger(res.Mensaje);
            this.IdCaptcha.reset();
    
          }
          this.isSubmitted = false;
        }, (error: any) => {
          this.IdCaptcha.reset();
          this.isSubmitted = false;
        //   this.bootstrapNotifyBarService.notifyDanger(error);
        });*/
      }





    recuperarRedirect() {
        return this.router.navigate(['/recuperar']);
      }

}
