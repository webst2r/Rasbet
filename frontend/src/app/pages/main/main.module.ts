import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainRoutingModule} from "./main-routing.module";
import {MainComponent} from "./main.component";
import {HomeModule} from "../home/home.module";
import {ToolbarModule} from "../../components/toolbar/toolbar.module";



@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    HomeModule,
    ToolbarModule
  ]
})
export class MainModule { }
