import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ApostasService} from "../../services/apostas.service";
import {Aposta} from "../../interfaces/aposta";
import {AuthenticationService} from "../../services/authentication.service";
import {PageEvent} from "@angular/material/paginator";
import {take, tap} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {OutcomeType} from "../../interfaces/opcao_aposta";

@Component({
  selector: 'app-apostas',
  templateUrl: './apostas.component.html',
  styleUrls: ['./apostas.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class ApostasComponent implements OnInit {
  columnsToDisplay = ['game','date', 'betType', 'odd', 'value', 'state'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Aposta | null = null;

  public totalGames = 0;
  public itemsPerPage = 10;
  public currentPage = 0;
  apostas: Aposta[] = [];
  constructor(private apostasService: ApostasService,
              private auth: AuthenticationService,
              private translate: TranslateService) { }

  ngOnInit(): void {
    this.getBets(0,10);
  }

  private getBets(page: number, size: number){
    this.apostasService.getSimpleBets(  this.auth.getUserId(), page, size).pipe(
      take(1),
      tap(res =>{
        this.apostas = res['_embedded'].aposta
        this.totalGames = res.page.totalElements;
        this.itemsPerPage = res.page.size;
        this.currentPage = res.page.number
      }),
      tap(()=> console.log(this.apostas))
    ).subscribe();
  }
  pageChanged(event: PageEvent) {
    this.getBets(event.pageIndex, event.pageSize);
  }

  getElementName(element:Aposta): string{

    console.log(element);
    return element.jogo.homeTeam;
  }

  getElement(element: Aposta, column: string) {
    if(column === 'date') return element.createdAt;
    if(column === 'betType') return this.getBetOption(element);
    if(column === 'odd') return element.valorOdd;
    if(column === 'value') return element.valor + '€';
    if(column === 'state') return this.translate.instant('betState.'+ element.estado);
    if(column === 'game') return element.jogo.homeTeam + ' vs ' + element.jogo.awayTeam;
    return '';
  }

  private getBetOption(element: Aposta) {
    if(element.opcaoAposta.type === OutcomeType.HOME_TEAM){
      return element.jogo.homeTeam;
    }
    if(element.opcaoAposta.type === OutcomeType.AWAY_TEAM){
      return element.jogo.awayTeam;
    }
    return this.translate.instant("home.draw")
  }
}
