import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppConstant} from "../app.constant";

@Injectable({
  providedIn: 'root'
})
export class TransacoesService {

  constructor(private http: HttpClient) { }

  createTransation(id: number, valor: number, tipo: string, tipoDeposit: string): Observable<any>{
    const carteira =AppConstant.API_URL+ AppConstant.API_PATHS.CARTEIRA.DEFAULT + `/${id}`;
    return this.http.post(AppConstant.API_URL+ AppConstant.API_PATHS.TRANSACOES.DEFAULT, {
      carteira, valor, tipo, tipoDeposit
    }) as Observable<any>;
  }
}
