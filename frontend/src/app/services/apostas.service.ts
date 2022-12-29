import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {AppConstant} from "../app.constant";
import {Aposta, ApostaMultipla} from "../interfaces/aposta";


export interface SimpleBet {
  valor: number;
  oddId: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApostasService {

  constructor(private http: HttpClient) { }

  saveSimpleBets(apostas:SimpleBet[], id: number): Observable<any>{
    return this.http.post(AppConstant.API_URL + AppConstant.API_PATHS.APOSTAS.SAVE, {
      id,apostas
    }) as Observable<any>;
  }


  saveMultipleBet(id: number, valor: number, odds: number[]): Observable<any>{
    return this.http.post(AppConstant.API_URL + AppConstant.API_PATHS.APOSTAS.MULTIPLE, {
      id, valor, odds
    }) as Observable<any>;
  }

  getSimpleBets(id: number, page: number = 0, size: number = 10): Observable<any>{
    return this.http.get(AppConstant.API_URL + AppConstant.API_PATHS.APOSTAS.DEFAULT + `?user.id=${id}&page=${page}&size=${size}`)as Observable<any>
  }

  getMultipleBets(id: number, page: number = 0, size: number = 10): Observable<any>{
    return this.http.get(AppConstant.API_URL + AppConstant.API_PATHS.APOSTAS.MULTIPLE + `?user.id=${id}&page=${page}&size=${size}`)as Observable<any>
  }

  getCountBetsbyUser(id: number): Observable<any>{
    return this.http.get(AppConstant.API_URL + AppConstant.API_PATHS.APOSTAS.APOSTAS_COUNT.replace('id', String(id))) as Observable<any>
  }

  getMultipleCountBetsbyUser(id: number): Observable<any>{
    return this.http.get(AppConstant.API_URL + AppConstant.API_PATHS.APOSTAS.MULTIPLE_APOSTAS_COUNT.replace('id', String(id))) as Observable<any>
  }

  notifySimpleBet(id: number, activeNotification: boolean): Observable<any>{
    return this.http.patch(AppConstant.API_URL+ AppConstant.API_PATHS.APOSTAS.APOSTA_ID.replace('id', String(id)), {
      activeNotification
    }) as Observable<any>;
  }

  notifyMultipleBet(id: number, activeNotification: boolean): Observable<any>{
    return this.http.patch(AppConstant.API_URL+ AppConstant.API_PATHS.APOSTAS.MULTIPLE_ID.replace('id', String(id)), {
      activeNotification
    }) as Observable<any>;
  }

  cancelSimpleBet(id: number): Observable<any>{
    return this.http.post(AppConstant.API_URL+ AppConstant.API_PATHS.APOSTAS.CANCEL_APOSTA.replace('id', String(id)), {}) as Observable<any>;
  }

  cancelMultipleBet(id: number): Observable<any>{
    return this.http.post(AppConstant.API_URL+ AppConstant.API_PATHS.APOSTAS.CANCEL_MULTIPLE.replace('id', String(id)), {}) as Observable<any>;
  }
}
