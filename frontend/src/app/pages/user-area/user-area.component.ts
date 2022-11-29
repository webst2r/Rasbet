import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {StatisticsComponent} from "../../components/modal/statistics/statistics.component";
import {AuthenticationService} from "../../services/authentication.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppConstant} from "../../app.constant";
import {UserService} from "../../services/user.service";
import {ExceptionType} from "../../enumeration/exception";
import {TranslateService} from "@ngx-translate/core";
import {DepositComponent} from "../../components/modal/deposit/deposit.component";
import {RaiseComponent} from "../../components/modal/raise/raise.component";
import {ConfirmDialogService} from "../../services/confirm-dialog.service";


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
                private userService: UserService,
                private translate: TranslateService,
                private ref: ChangeDetectorRef,
                private confirmDialogService: ConfirmDialogService,
                public dialog: MatDialog) {
    }

    ngOnInit(): void {

    }

    openConfirmDialog(){
            this.confirmDialogService.showDialog().subscribe(
                (res) => {
                  if(res.save){
                    this.editInfo();
                  }else {
                    return;
                  }
                }
            )
          }

    openStatisticsDialog(): void {
        const dialogRef = this.dialog.open(StatisticsComponent, {
            width: 'auto',
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    editInfo(): void {
        if (this.form.invalid) {
            return;
        }

        const userId = this.authenticationService.getUserId();
        const user = this.authenticationService.getUser();

        this.userService.updateUserInfo(userId, this.form.controls['firstName'].value,
            this.form.controls['lastName'].value,
            this.form.controls['password'].value
        ).subscribe(
            () => {
                this.authenticationService.updateUserName(this.form.controls['firstName'].value,
                    this.form.controls['lastName'].value);

                this.form.reset();

            },
            (error) => {
                if (error.error && error.error.type === ExceptionType.ERROR_SAVING_INFO) {
                    this.error = this.translate.instant("profile.failSave");
                }
            }
        );
    }

    getUserFirstName(): string {
        let firstName = this.authenticationService.getUserFirstName();
        console.log(firstName);
        return firstName;
    }

    getUserLastName(): string {
        const firstName = this.authenticationService.getUserLastName();
        return firstName;
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

}
