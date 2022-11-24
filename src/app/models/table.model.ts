import {TemplateRef} from "@angular/core";
import {SortDirection} from "@angular/material/sort";

export type ColumnConfigModel<T, key extends keyof T> = {
    view: string,
    valueConverter?: (value: T[key]) => string,
    helpMessage?: string,
    disabledSort?: boolean,
    isSticky?: boolean,
    isDesc?: boolean,
    colorStyle?: (row: T) => string
  }
  | {
  view: string,
  columnTemplate: TemplateRef<{ value: T[key], row?: T }>,
  helpMessage?: string,
  isSticky?: boolean,
  disabledSort?: boolean
  isDesc?: boolean,
};

export type IBISTableColumnModel<T> = {
  [key in keyof Partial<T>]: ColumnConfigModel<T, key>
};

export type IBISTableDisplayedColumns<T> = Array<keyof T>;

export interface IBISSortModel {
  direction: SortDirection;
  active: string;
}

export interface LabeledValueModel {
  view?: string;
  value: string;
  templateRef?: TemplateRef<object>;
}

