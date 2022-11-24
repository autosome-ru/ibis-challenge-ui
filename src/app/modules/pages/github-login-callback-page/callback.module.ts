import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CallbackComponent} from './callback.component';
import {CallbackRoutingModule} from "./callback-routing.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    CallbackComponent
  ],
    imports: [
        CommonModule,
        CallbackRoutingModule,
        MatProgressSpinnerModule
    ]
})
export class CallbackModule { }
