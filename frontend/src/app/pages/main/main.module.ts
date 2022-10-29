import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainRoutingModule} from "./main-routing.module";
import {MainComponent} from "./main.component";
import {HomeModule} from "../home/home.module";



@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    HomeModule
  ]
})
export class MainModule { }
