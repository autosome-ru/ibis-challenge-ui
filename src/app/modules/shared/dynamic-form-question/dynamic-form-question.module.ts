import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicFormQuestionComponent} from './dynamic-form-question.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";


@NgModule({
    declarations: [
        DynamicFormQuestionComponent
    ],
    exports: [
        DynamicFormQuestionComponent
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class DynamicFormQuestionModule { }
