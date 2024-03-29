import {Injectable} from '@angular/core';
import {Jogo} from "../interfaces/jogo";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppConstant} from "../app.constant";
import {OutcomeType} from "../interfaces/opcao_aposta";
import * as http from "http";
import {A} from "@angular/cdk/keycodes";

export interface ApostaSelecionada {
  jogo: Jogo,
  opcao: OutcomeType,
  ammout?: number;
}

@Injectable({
  providedIn: 'root'
})
export class JogoService {
  private apostasSelecionadas: ApostaSelecionada[] = []

  constructor(private http: HttpClient) {
  }

  getJogos(withResults: boolean, page: number = 0, size: number = 10): Observable<any> {
    let url = AppConstant.API_URL + AppConstant.API_PATHS.JOGO.BET_GAMES + `?page=${page}&size=${size}&sort=date,asc`;

    return this.http.get<any>(url);
  }

  getAllJogos(page: number = 0, size: number = 10): Observable<any> {
    let url = AppConstant.API_URL + AppConstant.API_PATHS.JOGO.DEFAULT + `?page=${page}&size=${size}&sort=date,asc`;

    return this.http.get<any>(url);
  }
  getOddJogos(page: number = 0, size: number = 10): Observable<any> {
    let url = AppConstant.API_URL + AppConstant.API_PATHS.JOGO.ODD_GAMES + `?page=${page}&size=${size}&sort=date,asc`;

    return this.http.get<any>(url);
  }


  getTipos(): Observable<any>{
   return  this.http.get<any>(AppConstant.API_URL + AppConstant.API_PATHS.TIPO.DEFAULT)
  }

  createGame(homeTeam: string, awayTeam: string, date:string, idTipo: number): Observable<any>{
    return this.http.post(AppConstant.API_URL + AppConstant.API_PATHS.JOGO.CREATE, {
      homeTeam, awayTeam, date, idTipo
    })
  }

  editGame(id: number,homeTeam: string, awayTeam: string, date:string, idTipo: number): Observable<any>{
    return this.http.post(AppConstant.API_URL + AppConstant.API_PATHS.JOGO.EDIT.replace('id', String(id)), {
      homeTeam, awayTeam, date, idTipo
    })
  }

  addResultToGame(id: number, resultado: string, vencedor: string): Observable<any>{
    return this.http.post(AppConstant.API_URL + AppConstant.API_PATHS.JOGO.ADD_RESULT.replace('id', String(id)), {
      resultado, vencedor
    })
  }
  cancelGame(id:number): Observable<any>{
    return this.http.post(AppConstant.API_URL + AppConstant.API_PATHS.JOGO.CANCEL.replace('id', String(id)), {});
  }

  getApostasSelecionadas(): ApostaSelecionada[] {
    return this.apostasSelecionadas;
  }

  selecionarAposta(aposta: ApostaSelecionada) {
    let apostaExistenteIdx = this.apostasSelecionadas.findIndex(a => a.jogo.id === aposta.jogo.id);

    if (apostaExistenteIdx !== -1) {
      this.apostasSelecionadas[apostaExistenteIdx] = aposta
    } else {
      this.apostasSelecionadas.push(aposta)
    }
  }

  removerAposta(jogoId: number, opcao: OutcomeType) {
    let apostaExistenteIdx = this.apostasSelecionadas.findIndex(a => a.jogo.id === jogoId && a.opcao === opcao);

    if (apostaExistenteIdx !== -1) {
      this.apostasSelecionadas.splice(apostaExistenteIdx, 1)
    }
  }

  clearApostas() {
    this.apostasSelecionadas = [];
  }
}
