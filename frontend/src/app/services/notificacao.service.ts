import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import {AppConstant} from "../app.constant";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {

  constructor(private http: HttpClient) {
   }

  getAllNotifications(userId: number, page: number, pageSize: number): Observable<any> {
    const url = AppConstant.API_URL + AppConstant.API_PATHS.USER_NOTIFICACAO.DEFAULT;
    const params = new HttpParams()
        .set('users.id', userId)
        .set('sort', "date,asc")
        .set('page', page)
        .set('size', pageSize);

    return this.http.get<Observable<any>>(url, {params});
  }

  getNextNotifications(nextPage: string): Observable<any> {
    return this.http.get<Observable<any>>(nextPage);
  }
}
