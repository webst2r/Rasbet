import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {MatDialog} from "@angular/material/dialog";
import {DepositComponent} from "../modal/deposit/deposit.component";
import {RaiseComponent} from "../modal/raise/raise.component";
import {Role} from "../../interfaces/user";
import {TranslateService} from "@ngx-translate/core";
import { map, tap } from 'rxjs';
import { Notificacao } from 'src/app/interfaces/notificacao';
import { NotificacaoService } from 'src/app/services/notificacao.service';
import { NotificationType } from 'src/app/enumeration/notification_type';
import { UserNotification } from 'src/app/interfaces/user_notification';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  role = Role;
  unreadNotCount=0;
  notificacoes: UserNotification[] = [];
  notificacoesNextPage = '';

  constructor(public auth: AuthenticationService,
              private notificacaoService: NotificacaoService,
              private userService: UserService,
              public dialog: MatDialog,
              public translate: TranslateService) {
  }

  ngOnInit(): void {
    this.getUnreadNotificationsCount();
    this.getInitialNotifications();
  }

  setLanguageFlag() : string {
    if (this.translate.currentLang === 'pt'){
      return "flag-icon flag-icon-pt flag-icon-squared maior";
    } else return "flag-icon flag-icon-gb flag-icon-squared maior";
  }

  getUserWallet(): string {
    const value = this.auth.getUser()?.saldo.toFixed(2);
    return value != null ? value : '0.00';
  }

  openDepositDialog(): void {
    const dialogRef = this.dialog.open(DepositComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openRaiseDialog(): void {
    const dialogRef = this.dialog.open(RaiseComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  private getUnreadNotificationsCount() {
    this.userService.getTotalUnreadNotifications(this.auth.getUserId())
      .pipe(
        tap(res => this.unreadNotCount = res)
      )
      .subscribe();
  }

  private getInitialNotifications() {
    this.notificacaoService.getAllNotifications(this.auth.getUserId(), 0, 5)
      .pipe(
        tap(res => this.notificacoesNextPage = res['_links'].next?.href),
        map(res => res['_embedded']['userNotification']),
        tap(res => this.notificacoes = res)
      )
      .subscribe();
  }

  getNextNotificacoes() {
    if(!this.notificacoesNextPage) {
      return;
    }

    this.notificacaoService.getNextNotifications(this.notificacoesNextPage)
      .pipe(
        tap(res => this.notificacoesNextPage = res['_links'].next?.href),
        map(res => res['_embedded']['userNotification']),
        tap(res => this.notificacoes = this.notificacoes.concat(res))
      )
      .subscribe();
  }

  addNotificationDynamicValues(msg: string, notification: Notificacao) {
    const notificationType = notification.type;

    if(notificationType === NotificationType.ODDS_CHANGED || 
      notificationType === NotificationType.CANCEL_GAME) {
      return msg
              .replace('%{HOME_TEAM}', notification.jogo.homeTeam)
              .replace('%{AWAY_TEAM}', notification.jogo.awayTeam);
    }

    if(notificationType === NotificationType.FINISHED_GAME) {
      return msg
              .replace('%{HOME_TEAM}', notification.jogo.homeTeam)
              .replace('%{AWAY_TEAM}', notification.jogo.awayTeam)
              .replace('%{RESULT}', notification.jogo.resultado!);
    }

    if(notificationType === NotificationType.CANCEL_MULTIPLE_BET || 
      notificationType === NotificationType.UPDATE_MULTIPLE_BET || 
      notificationType === NotificationType.LOST_MULTIPLE_BET || 
      notificationType === NotificationType.WON_MULTIPLE_BET) {
      return msg
              .replace('%{DATE}', notification.apostasMultiplas.createdAt)
    }

    if(notificationType === NotificationType.WON_BET ||
      notificationType === NotificationType.LOST_BET ||
      notificationType === NotificationType.CANCEL_BET) {
        return msg
        .replace('%{HOME_TEAM}', notification.aposta.jogo.homeTeam)
        .replace('%{AWAY_TEAM}', notification.aposta.jogo.awayTeam);
    }

    return msg;
  }

  notificationsMenuOpened() {
    this.userService.readAllNotifications(this.auth.getUserId())
      .pipe(
        tap(_ => this.unreadNotCount = 0)
      )
      .subscribe()
  }
}
