import {Component, Input, OnInit} from '@angular/core';
import {QuestionBase} from "../../../models/question.model";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'ibis-form-question',
  templateUrl: './dynamic-form-question.component.html',
  styles: ["mat-form-field {max-width: 512px; width: 100%;}"]
})
export class DynamicFormQuestionComponent implements OnInit {
  @Input() question!: QuestionBase<string>;
  @Input() form!: FormGroup;

  constructor() {
  }

  get isValid() {
    return this.form.controls[this.question.key].valid;
  }

  get requiredError() {
    return this.form.controls[this.question.key].hasError('required');
  }

  get patternError() {
    return this.form.controls[this.question.key].hasError('pattern');
  }

  get emailError() {
    return this.form.controls[this.question.key].hasError('email');
  }

  ngOnInit(): void {
  }

}
