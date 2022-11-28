import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  text = '';
  constructor( public dialogRef: MatDialogRef<ConfirmComponent>,
               @Inject(MAT_DIALOG_DATA) public data: { text: string },
               private translate: TranslateService,) { }

  ngOnInit(): void {
    this.text = this.data.text;

    if (this.text === '') {
      this.text = this.translate.instant('dialog.confirmMessage');
    }
  }

}
