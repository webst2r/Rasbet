import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services/authentication.service";
import {UserService} from "../../../services/user.service";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {AppConstant} from "../../../app.constant";
import {MatDialogRef} from "@angular/material/dialog";
import {tap} from "rxjs";
import {ExceptionType} from "../../../enumeration/exception";


@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.scss']
})
export class EditInfoComponent implements OnInit {

  error: string = '';
  form: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.pattern(AppConstant.REGEX.password)]),
  });

  constructor(private readonly authenticationService: AuthenticationService,
              private user : UserService,
              private router: Router,
              private translate: TranslateService,
              public dialogRef: MatDialogRef<EditInfoComponent>,
              ) {}

  ngOnInit(): void {
  }

  editInfo() : void {
    if (this.form.invalid) {
      return;
    }

    const userId = this.authenticationService.getUserId();
    console.log(this.authenticationService.getUser());
    //console.log("Pass: " + this.form.controls['password'].value + " FN: " + this.form.controls['firstName'].value + " LN: " + this.form.controls['lastName'].value);

    this.user.updateUserInfo(userId, this.form.controls['password'].value,
      this.form.controls['firstName'].value,
      this.form.controls['lastName'].value).pipe(
      tap(res => console.log(res))
    ).subscribe(
      () => this.router.navigateByUrl('/profile'),
      (error) => {
        if (error.error && error.error.type === ExceptionType.ERROR_SAVING_INFO) {
          this.error = this.translate.instant("profile.failSave");
        }
      }
    );

    console.log(this.authenticationService.getUser());
    this.closeEdit()
  }

  closeEdit(): void {
      this.dialogRef.close();
    }

}
