import {Injectable} from '@angular/core';

import {IQuestionOptions, QuestionBase, TextboxQuestion} from "../models/question.model";
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {

  // TODO: get from a remote source of question metadata
  getQuestionsStream<T>(textboxQuestionsOptions: IQuestionOptions<string>[]): Observable<QuestionBase<string>[]> {

    const textboxQuestions: QuestionBase<string>[] = Array.from(textboxQuestionsOptions, option => new TextboxQuestion(option));
    const preQuestions: QuestionBase<string>[] = [];
    const questions = preQuestions.concat(textboxQuestions)

    return of(questions.sort((a, b) => a.order - b.order));
  }

  getQuestions<T>(textboxQuestionsOptions: IQuestionOptions<string>[]): QuestionBase<string>[] {

    const textboxQuestions: QuestionBase<string>[] = Array.from(textboxQuestionsOptions, option => new TextboxQuestion(option));
    const preQuestions: QuestionBase<string>[] = [];

    return preQuestions.concat(textboxQuestions).sort((a, b) => a.order - b.order);
  }
}
