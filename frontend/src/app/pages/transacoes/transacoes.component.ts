import {Component, OnInit} from '@angular/core';
import {take, tap} from "rxjs";
import {TransacoesService} from "../../services/transacoes.service";
import {AuthenticationService} from "../../services/authentication.service";
import {TranslateService} from "@ngx-translate/core";
import {Transaction} from "../../interfaces/user";
import {PageEvent} from "@angular/material/paginator";
import {Aposta} from "../../interfaces/aposta";

@Component({
  selector: 'app-transacoes',
  templateUrl: './transacoes.component.html',
  styleUrls: ['./transacoes.component.scss']
})
export class TransacoesComponent implements OnInit {
  columnsToDisplay = ['date', 'movementType', 'description', 'value'];
  public totalGames = 0;
  public itemsPerPage = 10;
  public currentPage = 0;
  transactions: Transaction[] = [];
  constructor(private transacoesService: TransacoesService,
              private auth: AuthenticationService,
              private translate: TranslateService) { }

  ngOnInit(): void {
    this.getTransactions(0,10);
  }
  private getTransactions(page: number, size: number){
    this.transacoesService.getUserTransactions(  this.auth.getUserId(), page, size).pipe(
      take(1),
      tap(res =>{
        this.transactions = res['_embedded'].transacoes
        this.totalGames = res.page.totalElements;
        this.itemsPerPage = res.page.size;
        this.currentPage = res.page.number
      }),
      tap(()=> console.log(this.transactions))
    ).subscribe();
  }

  pageChanged(event: PageEvent) {
    this.getTransactions(event.pageIndex, event.pageSize);
  }

  getElement(element: Transaction, column: string) {
    if(column === 'date') return element.createdAt;
    if(column === 'movementType') return this.getType(element);
    if(column === 'description') return element.tipoDeposit === 'BET'? this.translate.instant('transaction.bet') : element.tipoDeposit;
    if(column === 'value') return (element.tipo === "DEPOSIT"? '+' : '-') + element.valor.toFixed(2) + '€';
    return '';
  }

  getType(element: Transaction): string{
    if(element.tipo ==="DEPOSIT") {
      if(element.tipoDeposit ==="BET") return this.translate.instant('transaction.BETWINS');
      return this.translate.instant('transaction.DEPOSIT');
    }
    if(element.tipo ==="RAISE") {
      if(element.tipoDeposit ==="BET") return this.translate.instant('transaction.PURCHASE');
      return this.translate.instant('transaction.RAISE');
    }
    return ''
  }
}
