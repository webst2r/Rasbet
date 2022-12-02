import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {AuthGuard} from "./guard/auth.guard";
import {JwtModule} from "@auth0/angular-jwt";
import {StorageKey} from "./services/storage.service";
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {ToolbarModule} from "./components/toolbar/toolbar.module";
import {DepositComponent} from './components/modal/deposit/deposit.component';
import {MatSelectModule} from "@angular/material/select";
import {MatDialogModule} from "@angular/material/dialog";
import {AuthInterceptor} from "./helpers/auth.interceptor";
import { RaiseComponent } from './components/modal/raise/raise.component';
import { StatisticsComponent } from './components/modal/statistics/statistics.component';

// Chart
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {NgApexchartsModule} from "ng-apexcharts";
import { AddGameComponent } from './components/modal/add-game/add-game.component';
import {
  NGX_MAT_DATE_FORMATS, NgxMatDateAdapter,
  NgxMatDateFormats,
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from "@angular-material-components/datetime-picker";
import {NgxLoadingModule} from "ngx-loading";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {CustomNgxDatetimeAdapter} from "./helpers/CustomNgxDatetimeAdapter";
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS} from "@angular-material-components/moment-adapter";
import { ConfirmComponent } from './components/modal/confirm/confirm.component';
import { GameDetailsComponent } from './components/modal/game-details/game-details.component';
import { AddResultComponent } from './components/modal/add-result/add-result.component';
import { AddOddsComponent } from './components/modal/add-odds/add-odds.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

// If using Moment
const CUSTOM_DATE_FORMATS: NgxMatDateFormats = {
  parse: {
    dateInput: 'l, LTS'
  },
  display: {
    dateInput: 'DD-MM-YYYY HH:mm',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    DepositComponent,
    RaiseComponent,
    StatisticsComponent,
    AddGameComponent,
    ConfirmComponent,
    GameDetailsComponent,
    AddResultComponent,
    AddOddsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem(StorageKey.TOKEN),
        allowedDomains: ['localhost:4200/login', 'localhost:4200/register'],
        disallowedRoutes: [],
      },
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ToolbarModule,
    MatSelectModule,
    MatDialogModule,
    CommonModule,
    FormsModule,
    NgApexchartsModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    NgxLoadingModule.forRoot({}),
    MatDatepickerModule
  ],
  providers: [AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {
      provide: NgxMatDateAdapter,
      useClass: CustomNgxDatetimeAdapter,
      deps: [MAT_DATE_LOCALE, NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
