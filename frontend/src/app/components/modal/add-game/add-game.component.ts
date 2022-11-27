import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppConstant} from "../../../app.constant";
import {minimalAge} from "../../../helpers/validator";
import {JogoService} from "../../../services/jogo.service";
import {Tipo} from "../../../interfaces/tipo";
import {tap} from "rxjs";

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss']
})
export class AddGameComponent implements OnInit {
  error: string = '';
  form: FormGroup = new FormGroup({
    homeTeam: new FormControl('', [Validators.required]),
    awayTeam: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
  });

  tipos: Tipo[] = [];

  constructor(private jogoService: JogoService) { }

  ngOnInit(): void {
    this.getTipos();
  }

  save(){

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
