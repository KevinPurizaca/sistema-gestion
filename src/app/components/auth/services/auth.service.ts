import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, of } from 'rxjs';
import { AuthUtils } from '../../../core/auth.utils';
import { KeysLocalStorage } from '../../../core/config/options';


@Injectable()
export class AuthService {
  private _authenticated: boolean = false;

  /**
   * Constructor
   */
  constructor(
    private _httpClient: HttpClient
  ) {
  }




  async encriptarBodyLogin(data: any, tokenCaptcha: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient
        .post(`${environment.apiEdiUrl}/Usuario/Encriptar`, {
          Body: JSON.stringify(data),
          Token: "MIw3lILd1k4GwoAuelSGjwPVepY"
        })
        .subscribe({
          next: (data) => resolve({"data": data, "tokenCaptcha": tokenCaptcha}),
          error: (err) => reject(err),
        });
    });
  }

  async loginSecurity(request: any, tokenCaptchaV2: string): Promise<any> {
    var data = await this.encriptarBodyLogin(request, tokenCaptchaV2);
    return new Promise((resolve, reject) => {
      this._httpClient
        .post(`${environment.apiEdiUrl}/Authentication`, data)
        .subscribe({
          next: (data: any) => {
            return resolve(data);
          },
          error: (err) => reject(err),
        });
    });
  }



  /**
   * Sign out
   */
  signOut(): Observable<any> {
    localStorage.removeItem(KeysLocalStorage.InfoUsuario);
    localStorage.removeItem(KeysLocalStorage.Token);

    this._authenticated = false;
    return of(true);
  }



  set accessToken(token: string) {
    localStorage.setItem(KeysLocalStorage.Token, token);
  }


  get accessToken(): string {
    return localStorage.getItem(KeysLocalStorage.Token) ?? '';
  }
  /**
   * Check the authentication status
   */
  check(): Observable<boolean> {
    // Check if the user is logged in
    if (this._authenticated) {
      return of(true);
    }

    // Check the access token availability
    if (!this.accessToken) {
      return of(false);
    }

    // Check the access token expire date
    if (AuthUtils.isTokenExpired(this.accessToken)) {
      return of(false);
    }


    return of(true);
    //  return this.getUserDataInUsingToken();
    // //  return this.signInUsingToken();
  }
}
