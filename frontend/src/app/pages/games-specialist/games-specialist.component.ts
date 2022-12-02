import {Component, OnInit} from '@angular/core';
import {Jogo} from "../../interfaces/jogo";
import {PageEvent} from "@angular/material/paginator";
import {catchError, of, take, tap} from "rxjs";
import {OpcaoAposta, OutcomeType} from "../../interfaces/opcao_aposta";
import {JogoService} from "../../services/jogo.service";
import {TranslateService} from "@ngx-translate/core";
import {MatDialog} from "@angular/material/dialog";
import {GameDetailsComponent} from "../../components/modal/game-details/game-details.component";
import {AddOddsComponent} from "../../components/modal/add-odds/add-odds.component";

@Component({
    selector: 'app-games-specialist',
    templateUrl: './games-specialist.component.html',
    styleUrls: ['./games-specialist.component.scss']
})
export class GamesSpecialistComponent implements OnInit {

    columnsToDisplay = ['homeTeam', 'awayTeam', 'type', 'date', 'state', 'details', 'odds'];
    public totalGames = 0;
    public itemsPerPage = 10;
    public currentPage = 0;
    jogos: Jogo[] = [];

    constructor(private readonly jogoService: JogoService,
                private translate: TranslateService,
                public dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getJogos(0, 10);
    }

    private getJogos(page: number, size: number) {
        this.jogoService.getOddJogos(page, size)
            .pipe(
                take(1),
                tap(res => {
                    console.log(res);
                    this.jogos = res.jogo;
                    this.totalGames = res.page.totalElements;
                    this.itemsPerPage = res.page.size;
                    this.currentPage = res.page.number
                }),
                tap(_ => this.jogos.forEach(jogo => {
                    //ordenar apostas HOME, DRAW, AWAY
                    if (jogo.opcaoApostas.length > 0) {
                        const copiaApostas = [...jogo.opcaoApostas];
                        jogo.opcaoApostas = [];
                        jogo.opcaoApostas.push(copiaApostas.find(copy => copy.type === OutcomeType.HOME_TEAM) as OpcaoAposta);
                        if (jogo.tipo.empate) {
                            jogo.opcaoApostas.push(copiaApostas.find(copy => copy.type === OutcomeType.DRAW) as OpcaoAposta);
                        }
                        jogo.opcaoApostas.push(copiaApostas.find(copy => copy.type === OutcomeType.AWAY_TEAM) as OpcaoAposta);
                    }
                })),
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

    getElement(element: Jogo, column: string) {
        if (column === 'homeTeam') return element.homeTeam;
        if (column === 'awayTeam') return element.awayTeam;
        if (column === 'type') return this.translate.instant("bets." + element.tipo.nome);
        if (column === 'date') return this.formatDate(element.date);
        if (column === 'state') return this.translate.instant("games.gameStates." + element.state);
        return '';
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

    openDetails(element: Jogo) {
        const dialogRef = this.dialog.open(GameDetailsComponent, {
            width: '400px',
            data: {game: element}
        });

        dialogRef.afterClosed().subscribe();
    }

    openDialogOdds(element: Jogo) {
        const dialogRef = this.dialog.open(AddOddsComponent, {
            width: '400px',
            data: {game: element}
        });

        dialogRef.afterClosed().subscribe(() => this.getJogos(0, 10));
    }


}
