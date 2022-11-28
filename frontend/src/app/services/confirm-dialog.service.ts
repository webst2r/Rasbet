import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {ConfirmComponent} from "../components/modal/confirm/confirm.component";
import {AppConstant} from "../app.constant";

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  constructor(
      private dialog: MatDialog,
  ) { }

  showDialog(text: string = ''): Observable<{ save: boolean }> {
    const dialog = this.dialog.open(ConfirmComponent, {
      ...AppConstant.DIALOG_DEFAULT_CONFIG,
      data: { text },
      panelClass: 'custom-modalbox',
    });

    return dialog.afterClosed();
  }
}
