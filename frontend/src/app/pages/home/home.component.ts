import {Component, OnInit} from '@angular/core';
import {Jogo} from "../../interfaces/jogo";
import {JogoService} from "../../services/jogo.service";
import {catchError, Observable, of, subscribeOn, switchAll, switchMap, take, tap} from "rxjs";
import {PageEvent} from "@angular/material/paginator";
import {OpcaoAposta, OutcomeType} from "../../interfaces/opcao_aposta";
import {TranslateService} from "@ngx-translate/core";
import {AuthenticationService} from "../../services/authentication.service";
import {UserService} from "../../services/user.service";

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
    private listGamesToNotify: number[] = [];

    constructor(private readonly jogoService: JogoService,
                private translate: TranslateService,
                private auth: AuthenticationService,
                private userService: UserService) {
    }

    ngOnInit(): void {
        this.getJogos(0, 10);
    }

    private getGamesToNotify(): Observable<number[]> {
        return this.userService.listGameToNotify(this.auth.getUserId()).pipe(
            tap(res => this.listGamesToNotify = res)
        );
    }

    private getJogos(page: number, size: number) {
        this.getGamesToNotify().pipe(
            switchMap(res => this.jogoService.getJogos(false, page, size)),
            take(1),
            tap(res => {
                this.jogos = res.jogo;
                this.totalGames = res.page.totalElements;
                this.gamesPerPage = res.page.size;
                this.currentPage = res.page.number
            }),
            tap(_ => this.jogos.forEach(jogo => {
                //ordenar apostas HOME, DRAW, AWAY
                const copiaApostas = [...jogo.opcaoApostas];
                jogo.opcaoApostas = [];
                jogo.opcaoApostas.push(copiaApostas.find(copy => copy.type === OutcomeType.HOME_TEAM) as OpcaoAposta);
                if (jogo.tipo.empate) {
                    jogo.opcaoApostas.push(copiaApostas.find(copy => copy.type === OutcomeType.DRAW) as OpcaoAposta);
                }
                jogo.opcaoApostas.push(copiaApostas.find(copy => copy.type === OutcomeType.AWAY_TEAM) as OpcaoAposta);
            })),
            catchError(e => {
                console.error(e);
                return of();
            })
        ).subscribe()
    }

    checkGameNotify(gameId: number): string {
        if(!this.listGamesToNotify.includes(gameId)) return "material-icons-outlined";
        return "";
    }
    gameNotify(gameId: number){
        if(!this.listGamesToNotify.includes(gameId)){
            this.userService.addGameToNotify(this.auth.getUserId(), gameId).pipe(
                tap(res => this.listGamesToNotify.push(gameId))
            ).subscribe()
        }else {
            const index = this.listGamesToNotify.findIndex(id => id=== gameId);
            this.userService.removeGameToNotify(this.auth.getUserId(), gameId).pipe(
                tap(res => this.listGamesToNotify.splice(index, 1)),
            ).subscribe()
        }
    }

    pageChanged(event: PageEvent) {
        this.getJogos(event.pageIndex, event.pageSize);
    }

    handleTypeToShow(type: OutcomeType, jogo: Jogo): string {
        if (type === OutcomeType.HOME_TEAM) return jogo.homeTeam;
        if (type === OutcomeType.AWAY_TEAM) return jogo.awayTeam;

        return this.translate.instant('home.draw');
    }

    onChangeToggleGroup(jogo: Jogo, selectedOption: OutcomeType) {
        if (this.isDateInvalid(jogo.date)) {
            this.getJogos(0, 10);
            return;
        }

        this.jogoService.selecionarAposta({
            jogo,
            opcao: selectedOption
        })
    }

    isOpcaoApostaChecked(jogo: Jogo, type: OutcomeType) {
        const aposta = this.jogoService.getApostasSelecionadas()
            .findIndex(aposta => aposta.jogo.id === jogo.id && aposta.opcao === type);

        return aposta !== -1;
    }

    isDateInvalid(dateString: string): boolean {
        const date = new Date(dateString);
        const todayDate = new Date();

        return date.getTime() <= todayDate.getTime()
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
