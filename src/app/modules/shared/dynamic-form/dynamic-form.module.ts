import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicFormComponent} from './dynamic-form.component';
import {DynamicFormQuestionModule} from "../dynamic-form-question/dynamic-form-question.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        DynamicFormComponent
    ],
    exports: [
        DynamicFormComponent
    ],
  imports: [
    CommonModule,
    DynamicFormQuestionModule,
    ReactiveFormsModule
  ]
})
export class DynamicFormModule { }
