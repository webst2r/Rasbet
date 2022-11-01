import {Component, OnInit} from '@angular/core';
import {ApostaSelecionada, JogoService} from "../../services/jogo.service";
import {OpcaoAposta, OutcomeType} from "../../interfaces/opcao_aposta";
import {Jogo} from "../../interfaces/jogo";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public apostas: ApostaSelecionada[] = [];

  constructor(private jogoService: JogoService,
              private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.apostas = this.jogoService.getApostasSelecionadas()
  }

  getSelectedOdd(opcaoApostas: OpcaoAposta[], opcao: OutcomeType) {
    return opcaoApostas.find(op => op.type === opcao)?.odd;
  }

  getResultado(jogo: Jogo, opcao: OutcomeType) {
    if (opcao === OutcomeType.HOME_TEAM) return jogo.homeTeam;
    if (opcao === OutcomeType.AWAY_TEAM) return jogo.awayTeam;

    return this.translate.instant('home.draw');
  }

  removerAposta(jogoId: number, opcao: OutcomeType) {
    this.jogoService.removerAposta(jogoId, opcao);
  }
}
