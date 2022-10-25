import {Component, Input, OnInit} from '@angular/core';
import {QuestionControlService} from "../../../services/question-control.service";
import {QuestionBase} from "../../../models/question.model";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'ibis-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styles: [''],
  providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit {

  @Input() questions: QuestionBase<string>[] | null = [];
  form!: FormGroup;
  payLoad = '';

  constructor(private qcs: QuestionControlService) {}

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string>[]);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }

}
