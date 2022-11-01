import { Component, OnInit } from '@angular/core';
import {switchMap, tap} from "rxjs";
import {UserToken} from "../../../interfaces/user";
import {TransationType} from "../../../enumeration/deposit_type";
import {CarteiraService} from "../../../services/carteira.service";
import {TransacoesService} from "../../../services/transacoes.service";
import {AuthenticationService} from "../../../services/authentication.service";
import {MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-raise',
  templateUrl: './raise.component.html',
  styleUrls: ['./raise.component.scss']
})
export class RaiseComponent implements OnInit {
  form: FormGroup = new FormGroup({
    saldo: new FormControl(0, [Validators.required, Validators.min(0.01)]),
  });
  constructor(private carteiraService: CarteiraService,
              private transacoesService: TransacoesService,
              private auth: AuthenticationService,
              private dialogRef: MatDialogRef<RaiseComponent>) { }

  ngOnInit(): void {
  }

  updateSaldo(){
    const user = this.auth.getUser();
    if(this.form.controls['saldo'].value > (user?.saldo as number)){
      this.form.controls['saldo'].setErrors({'incorrect': false});
      return;
    }
    const saldo = user?.saldo as number -  this.form.controls['saldo'].value;
    this.carteiraService.updateSaldo(user?.idCarteira as number, saldo as number).pipe(
      tap((res) => {
        if(user && user.saldo){
          user.saldo = res.saldo;
        }
        this.auth.saveUser(user as UserToken);
      }),
      switchMap((res)=> this.transacoesService.createTransation(res.id,this.form.controls['saldo'].value, TransationType.RAISE, "IBAN"))
    ).subscribe( () => this.dialogRef.close());
  }

}
