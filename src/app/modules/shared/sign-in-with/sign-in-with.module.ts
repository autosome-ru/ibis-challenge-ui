import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignInWithComponent} from "./sign-in-with.component";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {HttpClientModule} from "@angular/common/http";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {RouterLink} from "@angular/router";


@NgModule({
  declarations: [SignInWithComponent],
  exports: [
    SignInWithComponent
  ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        HttpClientModule,
        MatProgressSpinnerModule,
        RouterLink
    ]
})
export class SignInWithModule {
}
