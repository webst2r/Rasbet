import {Injectable} from '@angular/core';
import {Jogo} from "../interfaces/jogo";
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {AppConstant} from "../app.constant";

@Injectable({
  providedIn: 'root'
})
export class JogoService {

  constructor(private http: HttpClient) {
  }

  getJogos(withResults: boolean, page: number = 0, size: number = 10): Observable<any> {
    let url = AppConstant.API_URL + AppConstant.API_PATHS.JOGO.DEFAULT + `?complete=${withResults}&page=${page}&size=${size}`;

    return this.http.get<any>(url);
  }
}
