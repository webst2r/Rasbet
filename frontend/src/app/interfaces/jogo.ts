import {Tipo} from "./tipo";
import {OpcaoAposta} from "./opcao_aposta";

export interface Jogo {
  id: number;
  date: Date;
  home_team: string;
  away_team: string;
  vencedor?: string;
  resultado: string;
  id_api: string;
  tipo: Tipo;
  opcaoApostas: OpcaoAposta[];
}
