import {Component, Inject, OnInit} from '@angular/core';
import {Jogo} from "../../../interfaces/jogo";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<GameDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { game: Jogo }) { }

  ngOnInit(): void {
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().length === 1 ? "0" + date.getDate().toString() : date.getDate().toString();
    const month = (date.getMonth() + 1).toString().length === 1 ? "0" + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString();
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().length === 1 ? "0" + date.getHours().toString() : date.getHours().toString();
    const minutes = date.getMinutes().toString().length === 1 ? "0" + date.getMinutes().toString() : date.getMinutes().toString();

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }
}
