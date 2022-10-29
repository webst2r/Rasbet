import {Component, OnInit} from '@angular/core';
import {Jogo} from "../../interfaces/jogo";
import {JogoService} from "../../services/jogo.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public jogos: Jogo[] = [];

  constructor(private readonly jogoService: JogoService) {
  }

  ngOnInit(): void {
    this.jogos = this.jogoService.getJogos();
  }

}
