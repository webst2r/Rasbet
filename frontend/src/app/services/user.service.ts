import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AppConstant} from "../app.constant";
import {HttpClient} from "@angular/common/http";
import {StorageService} from "./storage.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {JogoService} from "./jogo.service";
import {Router} from "@angular/router";
import * as stream from "stream";

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

  addGameToNotify(userId:number, gameId: number) : Observable<any>{
    return this.http.post(AppConstant.API_URL + AppConstant.API_PATHS.USER.ADD_NOTIFICATION_GAME
        .replace('id', String(userId))
        .replace('gameId', String(gameId)), {}) as Observable<any>;
  }

  removeGameToNotify(userId:number, gameId: number) : Observable<any>{
    return this.http.post(AppConstant.API_URL + AppConstant.API_PATHS.USER.REMOVE_NOTIFICATION_GAME
        .replace('id', String(userId))
        .replace('gameId', String(gameId)), {}) as Observable<any>;
  }

  listGameToNotify(userId:number) : Observable<number[]>{
    return this.http.get(AppConstant.API_URL + AppConstant.API_PATHS.USER.LIST_NOTIFICATION_GAME
        .replace('id', String(userId))) as Observable<number[]>;
  }

  getTotalUnreadNotifications(userId: number): Observable<number> {
    return this.http.get(AppConstant.API_URL + AppConstant.API_PATHS.USER.TOTAL_UNREAD_NOTIFICATIONS
      .replace('id', String(userId))) as Observable<number>;
  }

  readAllNotifications(userId: number): Observable<string> {
    return this.http.post(AppConstant.API_URL + AppConstant.API_PATHS.USER.READ_ALL_NOTIFICATIONS
      .replace('id', String(userId)), {}) as Observable<string>;
  }
}
