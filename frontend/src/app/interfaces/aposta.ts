import {OpcaoAposta} from "./opcao_aposta";
import {Tipo} from "./tipo";

export interface Aposta {
  id: number;
  valor: number;
  valorOdd: number;
  estado: string;
  valorGanho?: number;
  opcaoAposta: OpcaoAposta;
  jogo: JogoAposta;
  createdAt: string;
}

export interface JogoAposta {
  id: number;
  date: string;
  homeTeam: string;
  awayTeam: string;
  vencedor?: string;
  complete: boolean;
  resultado: string;
  tipo: Tipo;
}

export interface ApostaMultipla{
  id: number;
  valor: number;
  valorTotalGanho?: number;
  estado: string;
  apostas: Aposta[];
  createdAt: string;
}
