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

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().length === 1 ? "0" + date.getDate().toString() : date.getDate().toString();
    const month = (date.getMonth() + 1).toString().length === 1 ? "0" + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString();
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().length === 1 ? "0" + date.getHours().toString() : date.getHours().toString();
    const minutes = date.getMinutes().toString().length === 1 ? "0" + date.getMinutes().toString() : date.getMinutes().toString();

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }
}
