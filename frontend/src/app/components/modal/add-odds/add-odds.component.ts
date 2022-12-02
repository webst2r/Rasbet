import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ConfirmDialogService} from "../../../services/confirm-dialog.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Jogo} from "../../../interfaces/jogo";
import {OutcomeType} from "../../../interfaces/opcao_aposta";
import {OpcaoApostaService} from "../../../services/opcao-aposta.service";

@Component({
    selector: 'app-add-odds',
    templateUrl: './add-odds.component.html',
    styleUrls: ['./add-odds.component.scss']
})
export class AddOddsComponent implements OnInit {
    form: FormGroup = new FormGroup({
        homeTeam: new FormControl('', [Validators.required]),
        awayTeam: new FormControl('', [Validators.required]),
        draw: new FormControl(''),
    });

    constructor(private confirmDialogService: ConfirmDialogService,
                public dialogRef: MatDialogRef<AddOddsComponent>,
                @Inject(MAT_DIALOG_DATA) public data: { game: Jogo },
                private opcaoApostaService: OpcaoApostaService) {
    }

    ngOnInit(): void {
        console.log(this.data);
        if (this.data.game.opcaoApostas.length > 0) {

            // @ts-ignore
            this.form.controls['homeTeam'].setValue(this.data.game.opcaoApostas.find(copy => copy.type === OutcomeType.HOME_TEAM).odd);
            // @ts-ignore
            this.form.controls['awayTeam'].setValue(this.data.game.opcaoApostas.find(copy => copy.type === OutcomeType.AWAY_TEAM).odd);
            if (this.data.game.tipo.empate) {
                // @ts-ignore
                this.form.controls['draw'].setValue(this.data.game.opcaoApostas.find(copy => copy.type === OutcomeType.DRAW).odd);
            }
        }
    }


    openConfirmDialog() {
        if (this.data.game.tipo.empate && (this.form.controls['draw'].value <= 0 || this.form.controls['draw'].value === undefined)) {
            this.form.controls['draw'].setErrors({'required': true});
            return;
        }
        this.confirmDialogService.showDialog().subscribe(
            (res) => {
                if (res.save) {
                    this.save();
                } else {
                    return;
                }
            }
        )
    }

    private save() {
        let odds: {type: string, odd: number }[] = [
            {
                type: "HOME_TEAM",
                odd: this.form.controls['homeTeam'].value
            },
            {
                type: "AWAY_TEAM",
                odd: this.form.controls['awayTeam'].value
            }
        ];
        if (this.data.game.tipo.empate) {
            odds.push({
                type: "DRAW",
                odd: this.form.controls['draw'].value
            });
        }
        this.opcaoApostaService.addOdds(odds, this.data.game.id).subscribe(() => this.dialogRef.close(true))
    }
}
