import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../../../environments/environment';


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









}
