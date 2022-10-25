import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {QuestionBase} from '../models/question.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionControlService {
  constructor() {
  }

  toFormGroup(questions: QuestionBase<string>[]) {
    const group: any = {};

    questions.forEach(question => {
      let validators = [];
      if (question.required) {
        validators.push(Validators.required);
      }
      if (question.pattern) {
        validators.push(Validators.pattern(question.pattern.pattern));
      }
      if (question.emailValid) {
        validators.push(Validators.email)
      }
      group[question.key] = new FormControl(question.value || '', validators);
    });
    return new FormGroup(group);
  }
}
