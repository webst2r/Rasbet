import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {StatisticsComponent} from "../../components/modal/statistics/statistics.component";
import {EditInfoComponent} from "../../components/modal/edit-info/edit-info.component";
import {tap} from "rxjs";
import {AuthenticationService} from "../../services/authentication.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppConstant} from "../../app.constant";
import {UserService} from "../../services/user.service";
import {ExceptionType} from "../../enumeration/exception";
import {TranslateService} from "@ngx-translate/core";
import {DepositComponent} from "../../components/modal/deposit/deposit.component";
import {RaiseComponent} from "../../components/modal/raise/raise.component";


@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.scss']
})
export class UserAreaComponent implements OnInit {

  error: string = '';
  form: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.pattern(AppConstant.REGEX.password)]),
  });

  constructor(private readonly authenticationService: AuthenticationService,
              private user : UserService,
              private translate: TranslateService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openStatisticsDialog(): void {
    const dialogRef = this.dialog.open(StatisticsComponent, {
      width: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  editInfo() : void {
    if (this.form.invalid) {
      return;
    }

    const userId = this.authenticationService.getUserId();
    console.log(this.authenticationService.getUser());
    console.log("Pass: " + this.form.controls['password'].value + " FN: " + this.form.controls['firstName'].value + " LN: " + this.form.controls['lastName'].value);

    this.user.updateUserInfo(userId, this.form.controls['firstName'].value,
        this.form.controls['lastName'].value,
        this.form.controls['password'].value).pipe(
        tap(res => console.log(res))
    ).subscribe(
        (error) => {
          if (error.error && error.error.type === ExceptionType.ERROR_SAVING_INFO) {
            this.error = this.translate.instant("profile.failSave");
          }
        }
    );

    console.log(this.authenticationService.getUser());
  }

  getUserWallet(): string {
    const value = this.authenticationService.getUser()?.saldo.toFixed(2);
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

/*  openEditInfoDialog(): void {
    const dialogRef = this.dialog.open(EditInfoComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }*/

}
