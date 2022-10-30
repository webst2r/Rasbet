import {Tipo} from "./tipo";
import {OpcaoAposta} from "./opcao_aposta";

export interface Jogo {
  id: number;
  date: string;
  homeTeam: string;
  awayTeam: string;
  vencedor?: string;
  resultado: string;
  idApi: string;
  tipo: Tipo;
  opcaoApostas: OpcaoAposta[];
}
