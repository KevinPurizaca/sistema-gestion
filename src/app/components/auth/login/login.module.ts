import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings, RecaptchaFormsModule } from 'ng-recaptcha';
import { environment } from '../../../../environments/environment';



@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        ButtonModule,
        
        InputTextModule,
        FormsModule,
        ReactiveFormsModule,
        PasswordModule,
        ToastModule,

        RecaptchaModule,
        RecaptchaFormsModule,
    ],
    declarations: [LoginComponent],
    providers:[{
        provide: RECAPTCHA_SETTINGS,
        useValue: {
          siteKey: environment.ClientKeyCaptcha
        } as RecaptchaSettings,
      }]
})
export class LoginModule { }
