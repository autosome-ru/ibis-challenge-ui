import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LandingComponent} from './landing.component';
import {ParallaxModule} from "../../shared/parallax/parallax.module";
import {CodeModule} from "../../shared/code/code.module";
import {MatButtonModule} from "@angular/material/button";
import {LandingRoutingModule} from "./landing-routing.module";


@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
    CommonModule,
    ParallaxModule,
    CodeModule,
    MatButtonModule,
    LandingRoutingModule
  ]
})
export class LandingModule {
}
