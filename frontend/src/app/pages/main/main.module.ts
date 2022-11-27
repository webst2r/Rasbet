import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainRoutingModule} from "./main-routing.module";
import {MainComponent} from "./main.component";
import {HomeModule} from "../home/home.module";
import {ToolbarModule} from "../../components/toolbar/toolbar.module";
import {MatSidenavModule} from "@angular/material/sidenav";
import {SidebarModule} from "../../components/sidebar/sidebar.module";
import {MatDialogModule} from "@angular/material/dialog";
import {ApostasComponent} from "../apostas/apostas.component";
import {ApostasMultiplasComponent} from "../apostas-multiplas/apostas-multiplas.component";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";
import { TransacoesComponent } from '../transacoes/transacoes.component';
import {UserAreaComponent} from "../user-area/user-area.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {GamesAdminComponent} from "../games-admin/games-admin.component";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatMenuModule} from "@angular/material/menu";


@NgModule({
  declarations: [MainComponent,
    ApostasComponent,
    ApostasMultiplasComponent,
    TransacoesComponent,
    UserAreaComponent,
    GamesAdminComponent],
    imports: [
        CommonModule,
        MainRoutingModule,
        HomeModule,
        ToolbarModule,
        MatSidenavModule,
        SidebarModule,
        MatDialogModule,
        MatTableModule,
        MatIconModule,
        MatPaginatorModule,
        MatButtonModule,
        TranslateModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatMenuModule
    ]
})
export class MainModule {
}
