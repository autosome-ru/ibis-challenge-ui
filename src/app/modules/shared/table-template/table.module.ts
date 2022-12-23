import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableComponent} from './mat-table/table.component';
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTooltipModule} from "@angular/material/tooltip";
import {IBISPipesModule} from "../../../pipes/pipe.module";


@NgModule({
  declarations: [
    TableComponent
  ],
  exports: [
    TableComponent
  ],
  imports: [
    CommonModule,
    MatSortModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatTooltipModule,
    IBISPipesModule
  ]
})
export class TableModule {
}
