import {Pipe, PipeTransform} from "@angular/core";
import {ColumnConfigModel, IBISTableColumnModel} from "../models/table.model";

@Pipe({name: "columnModelToList"})
export class ColumnModelToListPipe<T> implements PipeTransform {
  transform(object: IBISTableColumnModel<T>): {
    key: keyof T; value: ColumnConfigModel<T, keyof T>
  }[] {
    console.log("ColumnModelToListPipe.transform got", object)
    const keys = Object.keys(object) as (keyof T)[];
    return keys.map(
      s => {
        return {
          key: s,
          value: object[s]
        };
      }
    );
  }
}
