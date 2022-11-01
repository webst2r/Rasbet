import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from "./sidebar.component";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [SidebarComponent],
  exports: [
    SidebarComponent
  ],
    imports: [
        CommonModule,
        TranslateModule
    ]
})
export class SidebarModule {
}
