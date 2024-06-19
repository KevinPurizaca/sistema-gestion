import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { environment } from '../../../environments/environment';

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule
    ],
    providers: []
})
export class AuthModule { }
