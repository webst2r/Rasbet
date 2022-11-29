import { Component, OnInit } from '@angular/core';
import {DepositType, TransationType} from "../../../enumeration/deposit_type";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppConstant} from "../../../app.constant";
import {CarteiraService} from "../../../services/carteira.service";
import {AuthenticationService} from "../../../services/authentication.service";
import {switchMap, tap} from "rxjs";
import {UserToken} from "../../../interfaces/user";
import {ConfirmDialogService} from "../../../services/confirm-dialog.service";
import {MatDialogRef} from "@angular/material/dialog";
import {TransacoesService} from "../../../services/transacoes.service";

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {

  depositType = DepositType;

  form: FormGroup = new FormGroup({
    saldo: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
  });

  constructor(private carteiraService: CarteiraService,
              private transacoesService: TransacoesService,
              private auth: AuthenticationService,
              private confirmDialogService: ConfirmDialogService,
              private dialogRef: MatDialogRef<DepositComponent>) { }

  ngOnInit(): void {
  }

  openConfirmDialog(){
      this.confirmDialogService.showDialog().subscribe(
          (res) => {
            if(res.save){
              this.updateSaldo();
            }else {
              return;
            }
          }
      )
    }

  updateSaldo(){
    const user = this.auth.getUser();
    const saldo = user?.saldo +  this.form.controls['saldo'].value;
    this.carteiraService.updateSaldo(user?.idCarteira as number, saldo as number).pipe(
      tap((res) => {
        if(user && user.saldo !== undefined){
          user.saldo = res.saldo;
        }
        this.auth.saveUser(user as UserToken);
      }),
      switchMap((res)=> this.transacoesService.createTransation(res.id,this.form.controls['saldo'].value, TransationType.DEPOSIT, this.form.controls['tipo'].value ))
    ).subscribe( () => this.dialogRef.close());
  }
}
