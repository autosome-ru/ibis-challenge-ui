import { Pipe, PipeTransform } from "@angular/core";


@Pipe({name: "toString"})
export class NumberToStringPipe<T> implements PipeTransform {
  transform(object: number, digits?: number): string {
    return object || object === 0 ? object.toFixed(digits ?? 3) : 'n/a';
  }
}
