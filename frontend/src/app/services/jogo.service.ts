import {Injectable} from '@angular/core';
import {Jogo} from "../interfaces/jogo";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppConstant} from "../app.constant";
import {OutcomeType} from "../interfaces/opcao_aposta";

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
    let url = AppConstant.API_URL + AppConstant.API_PATHS.JOGO.DEFAULT + `?complete=${withResults}&page=${page}&size=${size}`;

    return this.http.get<any>(url);
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
