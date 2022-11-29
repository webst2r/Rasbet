import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {MatDialog} from "@angular/material/dialog";
import {DepositComponent} from "../modal/deposit/deposit.component";
import {RaiseComponent} from "../modal/raise/raise.component";
import {Role} from "../../interfaces/user";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  role = Role;
  constructor(public auth: AuthenticationService,
              public dialog: MatDialog,
              public translate: TranslateService) {
  }

  ngOnInit(): void {
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
}
