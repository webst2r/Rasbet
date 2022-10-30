import {Component, OnInit} from '@angular/core';
import {Jogo} from "../../interfaces/jogo";
import {JogoService} from "../../services/jogo.service";
import {catchError, of, take, tap} from "rxjs";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public jogos: Jogo[] = [];
  public totalGames = 0;
  public gamesPerPage = 10;
  public currentPage = 0;

  constructor(private readonly jogoService: JogoService) {
  }

  ngOnInit(): void {
    this.getJogos(0, 10);
  }

  private getJogos(page: number, size: number) {
    this.jogoService.getJogos(false, page, size)
      .pipe(
        take(1),
        tap(res => {
          this.jogos = res['_embedded'].jogo;
          this.totalGames = res.page.totalElements;
          this.gamesPerPage = res.page.size;
          this.currentPage = res.page.number
        }),
        catchError(e => {
          console.error(e);
          return of();
        })
      )
      .subscribe()
  }

  pageChanged(event: PageEvent) {
    this.getJogos(event.pageIndex, event.pageSize);
  }

}
