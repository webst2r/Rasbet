import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from "./home.component";
import {MatCardModule} from "@angular/material/card";
import {ToolbarModule} from "../../components/toolbar/toolbar.module";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatPaginatorModule} from "@angular/material/paginator";
import {TranslateModule} from "@ngx-translate/core";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [HomeComponent],
    imports: [
        CommonModule,
        MatCardModule,
        ToolbarModule,
        MatButtonToggleModule,
        MatPaginatorModule,
        TranslateModule,
        MatIconModule
    ]
})
export class HomeModule { }
