import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationComponent} from './navigation.component';
import {MatButtonModule} from "@angular/material/button";
import {LogoModule} from "../logo/logo.module";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatDialogModule} from "@angular/material/dialog";
import {SignInWithModule} from "../sign-in-with/sign-in-with.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatRippleModule} from "@angular/material/core";
import {MatListModule} from "@angular/material/list";
import {RouterLink, RouterLinkActive} from "@angular/router";


@NgModule({
  declarations: [
    NavigationComponent,
  ],
  exports: [
    NavigationComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    LogoModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatDialogModule,
    SignInWithModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatListModule,
    RouterLink,
    RouterLinkActive
  ], providers: []
})
export class NavigationModule {
}
