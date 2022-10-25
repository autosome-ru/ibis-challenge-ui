import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ParallaxComponent} from "./parallax.component";

export interface IParallaxLabels {
  label: string,
  top: number,
  left: number,
  standingOut?: boolean
}

@NgModule({
  declarations: [ParallaxComponent],
  exports: [ParallaxComponent],
  imports: [
    CommonModule
  ]
})
export class ParallaxModule {
}
