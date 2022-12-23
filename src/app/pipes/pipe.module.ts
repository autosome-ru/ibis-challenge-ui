import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ColumnModelToListPipe} from "./json-to-list.pipe";
import {NumberToStringPipe} from "./number-to-string.pipe";


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ColumnModelToListPipe,
    NumberToStringPipe,
  ],
  exports: [
    ColumnModelToListPipe,
    NumberToStringPipe,

  ]
})
export class IBISPipesModule {
}
