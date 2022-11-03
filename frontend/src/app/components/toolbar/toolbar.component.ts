import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {MatDialog} from "@angular/material/dialog";
import {DepositComponent} from "../modal/deposit/deposit.component";
import {RaiseComponent} from "../modal/raise/raise.component";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(public auth: AuthenticationService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  getUserWallet(): string {
    const value = this.auth.getUser()?.saldo.toFixed(2);
    return value != null ? value : '0.00';
  }

  openDepositDialog(): void {
    const dialogRef = this.dialog.open(DepositComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openRaiseDialog(): void {
    const dialogRef = this.dialog.open(RaiseComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
