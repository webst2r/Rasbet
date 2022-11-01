import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppConstant} from "../app.constant";

@Injectable({
  providedIn: 'root'
})
export class CarteiraService {

  constructor(private http: HttpClient) {
  }

  updateSaldo(id: number, saldo: number): Observable<any> {
    return this.http.post(AppConstant.API_URL + AppConstant.API_PATHS.CARTEIRA.DEFAULT,
      {
        id,
        saldo
      }) as Observable<any>;
  }
}
