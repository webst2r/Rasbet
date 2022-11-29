import {Component, OnInit} from '@angular/core';
import {Jogo} from "../../interfaces/jogo";
import {catchError, of, take, tap} from "rxjs";
import {PageEvent} from "@angular/material/paginator";
import {OpcaoAposta, OutcomeType} from "../../interfaces/opcao_aposta";
import {JogoService} from "../../services/jogo.service";
import {TranslateService} from "@ngx-translate/core";
import {MatDialog} from "@angular/material/dialog";
import {AddGameComponent} from "../../components/modal/add-game/add-game.component";
import {GameDetailsComponent} from "../../components/modal/game-details/game-details.component";

@Component({
    selector: 'app-games-admin',
    templateUrl: './games-admin.component.html',
    styleUrls: ['./games-admin.component.scss']
})
export class GamesAdminComponent implements OnInit {
    columnsToDisplay = ['homeTeam', 'awayTeam', 'type', 'date', 'details', 'edit', 'result'];
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
        this.jogoService.getAllJogos( page, size)
            .pipe(
                take(1),
                tap(res => {
                    console.log(res);
                    this.jogos = res['_embedded'].jogo;
                    this.totalGames = res.page.totalElements;
                    this.itemsPerPage = res.page.size;
                    this.currentPage = res.page.number
                }),
                tap(_ => this.jogos.forEach(jogo => {
                    //ordenar apostas HOME, DRAW, AWAY
                    if (jogo.opcaoApostas.length >0) {
                        const copiaApostas = [...jogo.opcaoApostas];
                        jogo.opcaoApostas = [];
                        jogo.opcaoApostas.push(copiaApostas.find(copy => copy.type === OutcomeType.HOME_TEAM) as OpcaoAposta);
                        jogo.opcaoApostas.push(copiaApostas.find(copy => copy.type === OutcomeType.DRAW) as OpcaoAposta);
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

    openDialogCreate() {
        const dialogRef = this.dialog.open(AddGameComponent, {
            width: '300px',
            data: {edit: false}
        });

        dialogRef.afterClosed().subscribe(result => {
            if(result){
                this.getJogos(0, 10);
            }
        });
    }

    openDialogEdit(game: Jogo){
        const dialogRef = this.dialog.open(AddGameComponent, {
            width: '300px',
            data: {edit: true, game: game}
        });

        dialogRef.afterClosed().subscribe(result => {
            if(result){
                this.getJogos(0, 10);
            }
        });
    }

    openDetails(element: Jogo) {
        const dialogRef = this.dialog.open(GameDetailsComponent, {
            width: '400px',
            data: {game: element}
        });

        dialogRef.afterClosed().subscribe();
    }
}
