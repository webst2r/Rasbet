import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToolbarComponent} from "./toolbar.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [ToolbarComponent],
  exports: [
    ToolbarComponent
  ],
    imports: [
        CommonModule,
        MatToolbarModule,
        MatButtonModule,
        RouterLink,
        TranslateModule,
        MatMenuModule,
        MatIconModule
    ]
})
export class ToolbarModule {
}
