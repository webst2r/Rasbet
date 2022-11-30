import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Jogo} from "../../../interfaces/jogo";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as moment from "moment/moment";
import {ConfirmDialogService} from "../../../services/confirm-dialog.service";
import {JogoService} from "../../../services/jogo.service";

@Component({
  selector: 'app-add-result',
  templateUrl: './add-result.component.html',
  styleUrls: ['./add-result.component.scss']
})
export class AddResultComponent implements OnInit {
  form: FormGroup = new FormGroup({
    homeTeam: new FormControl(0, [Validators.required]),
    awayTeam: new FormControl(0, [Validators.required]),
    winner: new FormControl('', [Validators.required]),
  });
  constructor(public dialogRef: MatDialogRef<AddResultComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { game: Jogo },
              private confirmDialogService: ConfirmDialogService,
              private jogoService: JogoService) { }

  ngOnInit(): void {
  }
  openConfirmDialog(){
    this.confirmDialogService.showDialog().subscribe(
        (res) => {
          if(res.save){
            this.save();
          }else {
            return;
          }
        }
    )
  }

  private save() {
    const result = this.form.controls['homeTeam'].value+'x'+this.form.controls['awayTeam'].value
    this.jogoService.addResultToGame(this.data.game.id, result, this.form.controls['winner'].value)
        .subscribe(() => this.dialogRef.close(true))
  }
}
