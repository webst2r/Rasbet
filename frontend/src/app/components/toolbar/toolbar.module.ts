import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToolbarComponent} from "./toolbar.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatBadgeModule} from "@angular/material/badge";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


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
        MatIconModule,
        MatBadgeModule,
        InfiniteScrollModule
    ]
})
export class ToolbarModule {
}
