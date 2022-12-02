import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppConstant} from "../app.constant";

@Injectable({
    providedIn: 'root'
})
export class OpcaoApostaService {

    constructor(private http: HttpClient) {
    }

    addOdds(odds: { type: string, odd: number }[], id_jogo: number): Observable<any> {
        return this.http.post(AppConstant.API_URL + AppConstant.API_PATHS.OPCAO_APOSTA.ADD.replace('id_jogo', String(id_jogo)),
            {
                odds
            })
    }
}
