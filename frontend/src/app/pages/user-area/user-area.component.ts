import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {StatisticsComponent} from "../../components/modal/statistics/statistics.component";

@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.scss']
})
export class UserAreaComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openStatisticsDialog(): void {
    const dialogRef = this.dialog.open(StatisticsComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
