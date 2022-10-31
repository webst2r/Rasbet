import {Injectable} from '@angular/core';
import {Jogo} from "../interfaces/jogo";
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {AppConstant} from "../app.constant";
import {OpcaoAposta, OutcomeType} from "../interfaces/opcao_aposta";

export interface ApostaSelecionada {
  jogo: Jogo,
  opcao: OutcomeType
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
    let apostaExistenteIdx = this.apostasSelecionadas.findIndex(a => a.jogo.id == aposta.jogo.id);

    if (apostaExistenteIdx !== -1) {
      this.apostasSelecionadas[apostaExistenteIdx] = aposta
    } else {
      this.apostasSelecionadas.push(aposta)
    }
  }
}
