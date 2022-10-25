export interface IQuestionOptions<T> {
  value?: T;
  key?: string;
  label?: string;
  required?: boolean;
  pattern?: { pattern: string, errorMsg: string };
  emailValid?: boolean;
  order?: number;
  controlType?: string;
  type?: string;
  options?: { key: string, value: string }[];
  placeholder?: string;
}

export class QuestionBase<T> {
  value: T | undefined;
  key: string;
  label: string;
  required: boolean;
  pattern: { pattern: string, errorMsg: string };
  emailValid: boolean;
  order: number;
  controlType: string;
  type: string;
  options: { key: string, value: string }[];
  placeholder: string;

  constructor(options: IQuestionOptions<T> = {} as IQuestionOptions<T>) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.pattern = options.pattern || {pattern: '', errorMsg: ''};
    this.emailValid = !!options.emailValid;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.options = options.options || [];
    this.placeholder = "Ex. " + options.placeholder || "";
  }
}

export class TextboxQuestion extends QuestionBase<string> {
  override controlType = 'textbox';
}
