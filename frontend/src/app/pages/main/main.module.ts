import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainRoutingModule} from "./main-routing.module";
import {MainComponent} from "./main.component";
import {HomeModule} from "../home/home.module";
import {ToolbarModule} from "../../components/toolbar/toolbar.module";
import {MatSidenavModule} from "@angular/material/sidenav";
import {SidebarModule} from "../../components/sidebar/sidebar.module";


@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    HomeModule,
    ToolbarModule,
    MatSidenavModule,
    SidebarModule
  ]
})
export class MainModule {
}
