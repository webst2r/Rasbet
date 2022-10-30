import {Component, OnInit} from '@angular/core';
import {Jogo} from "../../interfaces/jogo";
import {JogoService} from "../../services/jogo.service";
import {catchError, map, of, take, tap} from "rxjs";

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
    this.getJogos();
  }

  private getJogos() {
    this.jogoService.getJogos(false)
      .pipe(
        take(1),
        map(res => res['_embedded']),
        tap(jogos => this.jogos = jogos.jogo),
        catchError(e => {
          console.error(e);
          return of();
        })
      )
      .subscribe()
  }
}
