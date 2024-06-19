import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iif, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable()
export class HttpCoreService {

  constructor(
    private http: HttpClient,
    private router: Router

  ) { }

  public get(collection: string): Observable<any> {
    const url = environment.UrlBase + collection;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.get<any[]>(url, httpOptions).pipe(
      tap((data: any) => {

      }),
      catchError(err => {
        return this.EstatusError(err);
      }),
    );
  }




  public getFromData(collection: string, body: FormData): Observable<any> {
    const jsonrequest = JSON.stringify(body);
    const url = environment.UrlBase + collection;

    const headers = new HttpHeaders().set("Content-Type", "multipart/form-data");

    const httpOptions = {
      headers: headers
    };

    //jsonrequest
    return this.http.get<any>(`${url}`, httpOptions).pipe(
      tap((data: any) => {

      }),
      catchError(err => {
        return this.EstatusError(err);
      }),
    );
  }

  public post(req: any, collection: string): Observable<any> {
    const jsonrequest = JSON.stringify(req);
    const url = environment.UrlBase + collection;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<any>(url, jsonrequest, httpOptions).pipe(
      tap((data: any) => {

      }),
      catchError(err => {
        return this.EstatusError(err);
      }),
    );
  }


  public postFromData(collection: string, body: FormData): Observable<any> {
    const jsonrequest = JSON.stringify(body);
    const url = environment.UrlBase + collection;

    const headers = new HttpHeaders().set("Content-Type", "multipart/form-data");

    const httpOptions = {
      headers: headers
    };

    //jsonrequest
    return this.http.post<any>(`${url}`, body).pipe(
      tap((data: any) => {

      }),
      catchError(err => {
        return this.EstatusError(err);
      }),
    );
  }

  public put(req: any, collection: string): Observable<any> {
    const jsonrequest = JSON.stringify(req);
    const url = environment.UrlBase + collection;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.put<any>(url, jsonrequest, httpOptions).pipe(
      tap((data: any) => {

      }),
      catchError(err => {
        return this.EstatusError(err);
      }),
    );
  }

  public delete(collection: string): Observable<any> {
    const url = environment.UrlBase + collection;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.delete<any>(url, httpOptions).pipe(
      tap((data: any) => {

      }),
      catchError(err => {
        return this.EstatusError(err);
      }),
    );
  }

  EstatusError(err: any): any {
    //debugger;
    let message_error: string = ''
    if (err.status == 0) {
      message_error = 'Error, la conexion con el servidor no es posible: %', err.message + ' ' + (err.error != null ? err.error.innerException : null)
      console.error(message_error);
      throw message_error;
    }
    if (err.status == 401) {
      message_error = 'Error, Falta de Autorización: ' + err.message + ' ' + (err.error != null ? err.error.innerException : null);
      console.error(message_error);
      this.router.navigate(['/login']);
      throw message_error;
    }
    if (err.status == 400) {
      message_error = 'Error, Servicio com Problemas: ' + err.message + ' ' + (err.error != null ? err.error.innerException : null);
      console.error(message_error);

      throw message_error;
    }
    if (err.status == 403) {
      message_error = 'Error, Falta de permisos para el servicio: ' + err.message + ' ' + (err.error != null ? err.error.innerException : null);
      console.error(message_error);
      throw message_error;
    }
    throw 'Error in source. Details: ' + err.error;
    // return  err.error;

  }
}