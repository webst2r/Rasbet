import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {JogoService} from "../../../services/jogo.service";
import {Tipo} from "../../../interfaces/tipo";
import {tap} from "rxjs";
import * as moment from 'moment';


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

  constructor(private jogoService: JogoService) { }

  ngOnInit(): void {
    this.getTipos();
  }

  save(){
    console.log(this.form.controls['date'].value);
  }

  getTipos(){
    this.jogoService.getTipos().pipe(
        tap(res => {
          console.log(res)
          this.tipos = res['_embedded'].tipo;
        })
    ).subscribe();
  }
}
