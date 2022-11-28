import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {JogoService} from "../../../services/jogo.service";
import {Tipo} from "../../../interfaces/tipo";
import {tap} from "rxjs";
import * as moment from 'moment';
import {ConfirmDialogService} from "../../../services/confirm-dialog.service";
import {MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss'],
})
export class AddGameComponent implements OnInit {
  form: FormGroup = new FormGroup({
    homeTeam: new FormControl('', [Validators.required]),
    awayTeam: new FormControl('', [Validators.required]),
    date: new FormControl(moment(), [Validators.required]),
    type: new FormControl( '', [Validators.required]),
  });

  tipos: Tipo[] = [];
  minDate = new Date();
  constructor(private jogoService: JogoService,
              private confirmDialogService: ConfirmDialogService,
              public dialogRef: MatDialogRef<AddGameComponent>,) { }

  ngOnInit(): void {
    this.getTipos();
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

  save(){
    this.jogoService.createGame(this.form.controls['homeTeam'].value,
        this.form.controls['awayTeam'].value,
        this.form.controls['date'].value.format('YYYY-MM-DD HH:mm:ss'),
        this.form.controls['type'].value).subscribe(
            (res)  =>this.dialogRef.close(true))
  }

  getTipos(){
    this.jogoService.getTipos().pipe(
        tap(res => {
          this.tipos = res['_embedded'].tipo;
        })
    ).subscribe();
  }
}
