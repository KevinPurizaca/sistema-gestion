import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { AuthService } from './components/auth/services/auth.service';
// import { RECAPTCHA_SETTINGS, RecaptchaLoaderService, RecaptchaSettings } from 'ng-recaptcha';
// import { environment } from '../environments/environment';


export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule, BrowserAnimationsModule),

    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()),
    MessageService,
    AuthService,
    // RecaptchaLoaderService,
    // {
    //   provide: RECAPTCHA_SETTINGS,
    //   useValue: {
    //     siteKey: environment.ClientKeyCaptcha
    //   } as RecaptchaSettings,
    // }
  ],

};
