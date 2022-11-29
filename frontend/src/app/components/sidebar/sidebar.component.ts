import {Component, OnInit} from '@angular/core';
import {ApostaSelecionada, JogoService} from "../../services/jogo.service";
import {OpcaoAposta, OutcomeType} from "../../interfaces/opcao_aposta";
import {Jogo} from "../../interfaces/jogo";
import {TranslateService} from "@ngx-translate/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BetTypes} from "../../enumeration/bet_types";
import {ApostasService, SimpleBet} from "../../services/apostas.service";
import {AuthenticationService, WalletType} from "../../services/authentication.service";
import {ConfirmDialogService} from "../../services/confirm-dialog.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public apostas: ApostaSelecionada[] = [];

  betType = BetTypes;
  form: FormGroup = new FormGroup({
    type: new FormControl(this.betType.SIMPLE,[Validators.required] ),
    value: new FormControl(0 ) // the value type (string) should match
  })
  multipleOdd: number = 0.00;

  constructor(private jogoService: JogoService,
              private translate: TranslateService,
              private apostasService: ApostasService,
              private confirmDialogService: ConfirmDialogService,
              private auth: AuthenticationService) {
  }

  ngOnInit(): void {
    this.apostas = this.jogoService.getApostasSelecionadas()
  }

  openConfirmDialog(){
        this.confirmDialogService.showDialog().subscribe(
            (res) => {
              if(res.save){
                this.saveBet();
              }else {
                return;
              }
            }
        )
      }

  getSelectedOdd(opcaoApostas: OpcaoAposta[], opcao: OutcomeType) {
    return opcaoApostas.find(op => op.type === opcao)?.odd;
  }

  getResultado(jogo: Jogo, opcao: OutcomeType) {
    if (opcao === OutcomeType.HOME_TEAM) return jogo.homeTeam;
    if (opcao === OutcomeType.AWAY_TEAM) return jogo.awayTeam;

    return this.translate.instant('home.draw');
  }

  removerAposta(jogoId: number, opcao: OutcomeType) {
    this.jogoService.removerAposta(jogoId, opcao);
  }

  saveBet(){
    if (this.form.controls['type'].value === this.betType.SIMPLE) {
      const t = this.apostas.filter(aposta => aposta.ammout === undefined || aposta.ammout === 0).length > 0;
      if (t) {
        return;
      }
      if(this.getTotalAmount() > (this.auth.getUser()?.saldo as number)){
        return;
      }
      this.saveSimpleBet();
    } else {
      if(this.getTotalAmount() > (this.auth.getUser()?.saldo as number)){
        return;
      }
      if( this.form.controls['value'].value > 0) this.saveMultipleBet();
    }

  }

  setValue($event: Event, aposta: ApostaSelecionada) {
    const v = ($event.target as HTMLInputElement).value;
    aposta.ammout = Number(v);
  }

  getSimpleBetGain(aposta: ApostaSelecionada): string{
    if(aposta.ammout === undefined){
      return "0.00";
    }
    const odd = this.getSelectedOdd(aposta.jogo.opcaoApostas, aposta.opcao);
    return ((odd as number * aposta.ammout) - aposta.ammout).toFixed(2) ;
  }

  getMultipleOdd(){
    let odd = 1;

    this.apostas.forEach(aposta => {
      odd = odd * Number(this.getSelectedOdd(aposta.jogo.opcaoApostas, aposta.opcao));
    })
    this.multipleOdd = odd;
    return odd.toFixed(2);
  }

  getTotalGains(){
    let total = 0;
    if(this.form.controls['type'].value === this.betType.SIMPLE){
      this.apostas.forEach(aposta => {
        if (aposta.ammout)
          total += Number(this.getSelectedOdd(aposta.jogo.opcaoApostas, aposta.opcao)) * aposta.ammout;
      })
    } else {
      total = Number(this.getMultipleOdd()) * this.form.controls['value'].value
    }

    return total.toFixed(2);
  }

  getSelectedOddId(opcaoApostas: OpcaoAposta[], opcao: OutcomeType) {
    return opcaoApostas.find(op => op.type === opcao)?.id;
  }

  private saveSimpleBet() {
    let ap: SimpleBet[] = [];
    let total = 0;
    this.apostas.forEach(aposta => {
      total += aposta.ammout as number;
      ap.push({
        valor: aposta.ammout as number,
        oddId: this.getSelectedOddId(aposta.jogo.opcaoApostas, aposta.opcao) as number
      })
    })
    this.apostasService.saveSimpleBets(ap, this.auth.getUser()?.id as number).subscribe(
      () =>{
        this.auth.updateUserWallet(total, WalletType.MINUS);
        this.jogoService.clearApostas();
        this.apostas = this.jogoService.getApostasSelecionadas();
      },
      (error) => console.log(error)
    );
  }

  private saveMultipleBet() {
    const odds: number[] = [];
    this.apostas.forEach(aposta => {
      odds.push( this.getSelectedOddId(aposta.jogo.opcaoApostas, aposta.opcao) as number)
    })
    this.apostasService.saveMultipleBet(this.auth.getUser()?.id as number, this.form.controls['value'].value, odds).subscribe(
      () => {
        this.auth.updateUserWallet(this.form.controls['value'].value, WalletType.MINUS);
        this.jogoService.clearApostas();
        this.apostas = this.jogoService.getApostasSelecionadas();
      },
      (error) => console.log(error)
    );
  }

  getTotalAmount(): number {
    let total = 0;
    if (this.form.controls['type'].value === this.betType.SIMPLE) {
      this.apostas.forEach(aposta => {
        if(aposta.ammout) total += aposta.ammout;
      });
    } else {
      total = this.form.controls['value'].value;
    }
    return total;
  }
}
