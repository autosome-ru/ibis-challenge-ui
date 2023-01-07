import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { PfmInputComponent } from "./pfm-input.component";
import { TextFieldModule } from '@angular/cdk/text-field';


@NgModule({
  declarations: [
    PfmInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TextFieldModule
  ],
  exports: [
    PfmInputComponent
  ]
})
export class PfmInputModule { }
