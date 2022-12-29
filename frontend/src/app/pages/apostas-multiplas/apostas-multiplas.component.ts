import {Component, OnInit} from '@angular/core';
import {take, tap} from "rxjs";
import {ApostasService} from "../../services/apostas.service";
import {AuthenticationService} from "../../services/authentication.service";
import {TranslateService} from "@ngx-translate/core";
import {Aposta, ApostaMultipla} from "../../interfaces/aposta";
import {PageEvent} from "@angular/material/paginator";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {OutcomeType} from "../../interfaces/opcao_aposta";
import {ConfirmDialogService} from "../../services/confirm-dialog.service";

@Component({
  selector: 'app-apostas-multiplas',
  templateUrl: './apostas-multiplas.component.html',
  styleUrls: ['./apostas-multiplas.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ApostasMultiplasComponent implements OnInit {
  columnsToDisplay = ['date', 'totalGames', 'value', 'state', 'notification', 'cancel'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: ApostaMultipla | null = null;

  public totalGames = 0;
  public itemsPerPage = 10;
  public currentPage = 0;
  apostas: ApostaMultipla[] = [];

  constructor(private apostasService: ApostasService,
              private auth: AuthenticationService,
              private translate: TranslateService,
              private confirmDialogService: ConfirmDialogService) {
  }

  ngOnInit(): void {
    this.getBets(0, 10);
  }

  private getBets(page: number, size: number) {
    this.apostasService.getMultipleBets(this.auth.getUserId(), page, size).pipe(
      take(1),
      tap(res => {
        this.apostas = res['_embedded'].apostaMultipla
        this.totalGames = res.page.totalElements;
        this.itemsPerPage = res.page.size;
        this.currentPage = res.page.number
      }),
      tap(() => console.log(this.apostas))
    ).subscribe();
  }

  pageChanged(event: PageEvent) {
    this.getBets(event.pageIndex, event.pageSize);
  }

  getElement(element: ApostaMultipla, column: string) {
    if (column === 'date') return element.createdAt;
    if (column === 'totalGames') return element.apostas.length;
    if (column === 'value') return element.valor + '€';
    if (column === 'state') return this.translate.instant('betState.' + element.estado);
    return '';
  }

  formatValue(value: number): string{
    return value.toFixed(2);
  }

  getBetOption(element: Aposta) {
    if(element.opcaoAposta.type === OutcomeType.HOME_TEAM){
      return element.jogo.homeTeam;
    }
    if(element.opcaoAposta.type === OutcomeType.AWAY_TEAM){
      return element.jogo.awayTeam;
    }
    return this.translate.instant("home.draw")
  }

  betNotify(bet: ApostaMultipla) {
    this.apostasService.notifyMultipleBet(bet.id, !bet.activeNotification).pipe(
        tap(res =>  bet.activeNotification = res.activeNotification)
    ).subscribe();
  }

  checkBetNotify(bet: ApostaMultipla): string {
    return bet.activeNotification && bet.estado === 'PLACED' ? '' : 'material-icons-outlined';
  }

  cancelBet(bet: ApostaMultipla) {
    this.confirmDialogService.showDialog().subscribe(
        (res) => {
          if(res.save){
            this.save(bet);
          }else {
            return;
          }
        }
    )
  }

  save(bet: ApostaMultipla){
    this.apostasService.cancelMultipleBet(bet.id).pipe(
        tap(res => {
          bet.estado= 'CANCEL'
          bet.apostas.forEach(p => p.estado = 'CANCEL')
        })
    ).subscribe();
  }

  setBetDisable(bet: ApostaMultipla): boolean {
    if(bet.estado !== 'PLACED') return true;
    if( bet.apostas.filter(ap => ap.estado === 'MULTIPLE').length !== bet.apostas.length) return true;
    let invalid = false;
    bet.apostas.forEach(bet=> {
      if(this.isDateInvalid(bet.jogo.date)){
        invalid = true;
      }
    })
    return invalid;
  }

  isDateInvalid(dateString: string): boolean {
    const date = new Date(dateString);
    const todayDate = new Date();

    return date.getTime() <= todayDate.getTime()
  }
}
