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
}
