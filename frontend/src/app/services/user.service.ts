import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AppConstant} from "../app.constant";
import {HttpClient} from "@angular/common/http";
import {StorageService} from "./storage.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {JogoService} from "./jogo.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private readonly storageService: StorageService,
              private jwtHelperService: JwtHelperService,
              private jogoService: JogoService,
              private router: Router) { }


  updateUserInfo(userId: number, firstName: string, lastName: string, password: string) : Observable<any> {
    return this.http.post(AppConstant.API_URL + AppConstant.API_PATHS.USER.EDIT, {
      userId, firstName, lastName, password
    }) as Observable<any>;
  }
}
