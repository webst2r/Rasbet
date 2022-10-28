import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {catchError, tap} from "rxjs";
import {Router} from "@angular/router";
import {ExceptionType} from "../../enumeration/exception";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error: string = '';

  constructor(private readonly authenticationService:AuthenticationService,
              private router: Router,
              private translate: TranslateService) { }

  ngOnInit(): void {
  }
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  login() {
    if (!this.form.valid) {
      return;
    }

    this.authenticationService.login(this.form.controls['email'].value, this.form.controls['password'].value).pipe(
      tap(user => {
        this.authenticationService.saveToken(user.token);
        this.authenticationService.saveUser(user);
      }),
    ).subscribe(
      () => this.router.navigateByUrl('/home'),
    (error) => {
        if(error.error && error.error.type === ExceptionType.WRONG_CREDENTIALS){
          this.error = this.translate.instant("loginPage.wrongCredentials");
        }
       // console.log(error, error.error.type)
    }
    );
  }


}
