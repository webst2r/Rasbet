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
import { EditInfoComponent } from './components/modal/edit-info/edit-info.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    DepositComponent,
    RaiseComponent,
    StatisticsComponent,
    EditInfoComponent
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
    NgApexchartsModule
  ],
  providers: [AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
