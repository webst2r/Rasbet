import { Injectable } from '@angular/core';
import {Jogo} from "../interfaces/jogo";

@Injectable({
  providedIn: 'root'
})
export class JogoService {

  constructor() { }

  getJogos(): Jogo[] {
    //FIXME: replace mock with API call
    return [
      {
        away_team: "sporting",
        date: new Date(),
        home_team: "braga",
        id: 123,
        id_api: "abc123",
        resultado: "0x1",
        tipo: {
          id: 321,
          nome: "football",
          empate: true
        },
        opcaoApostas: [
          {
            id: 532,
            odd: 1.9,
            type: "empate"
          },
          {
            id: 532,
            odd: 2.1,
            type: "awayteam"
          },
          {
            id: 532,
            odd: 3,
            type: "hometeam"
          }
        ]
      },
      {
        away_team: "liverpool",
        date: new Date(2022, 12, 3),
        home_team: "juventus",
        id: 65445,
        id_api: "abc876",
        resultado: "8x4",
        tipo: {
          id: 34234,
          nome: "criket",
          empate: false
        },
        opcaoApostas: [
          {
            id: 23768,
            odd: 5,
            type: "awayteam"
          },
          {
            id: 712,
            odd: 2.4,
            type: "hometeam"
          }
        ]
      }
    ]
  }
}
