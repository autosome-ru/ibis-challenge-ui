import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TfDisciplineRoutingModule} from './tf-discipline-routing.module';
import {TfDisciplineComponent} from './tf-discipline-page/tf-discipline.component';
import {TableModule} from "../../shared/table-template/table.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { TfDisciplineHomeComponent } from './tf-discipline-home/tf-discipline-home.component';


@NgModule({
  declarations: [
    TfDisciplineComponent,
    TfDisciplineComponent,
    TfDisciplineHomeComponent
  ],
  imports: [
    CommonModule,
    TfDisciplineRoutingModule,
    TableModule,
    MatProgressSpinnerModule
  ]
})
export class TfDisciplineModule { }
