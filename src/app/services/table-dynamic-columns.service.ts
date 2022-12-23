import {IBISTableColumnModel} from "../models/table.model";

export interface DynamicColConfig {
  keyPrefix: string;
  keyValues: string[];
  viewGenerator: (key: string) => string;
  valueConverter?: (value: number) => string;
}


export class TableDynamicColumnsService<T> {
  private staticCols: string[];
  private dynamicCols: DynamicColConfig[];
  private staticModel: IBISTableColumnModel<T>;

  // private generatedDynamicCols: string[][];

  constructor(staticCols: string[], staticModel: IBISTableColumnModel<T>, dynamicCols: DynamicColConfig[] = []) {
    this.staticCols = staticCols;
    this.dynamicCols = dynamicCols;
    this.staticModel = staticModel;
  }

  public set setStaticCols(staticCols: string[]) {
    console.warn(staticCols)
    this.staticCols = staticCols;
  }

  public set setStaticModel(staticModel: IBISTableColumnModel<T>) {
    console.warn(staticModel)
    this.staticModel = staticModel;
  }

  public set setDynamicCols(dynamicCols: DynamicColConfig[]) {
    console.warn(dynamicCols)
    this.dynamicCols = dynamicCols;
  }

  getAllColumns(): string[] {
    let cols = this.staticCols;
    this.dynamicCols.forEach(
      dynamicCol =>
        cols = cols.concat(
          dynamicCol.keyValues.map(value => dynamicCol.keyPrefix + value)
        )
    )
    console.warn(cols)
    return cols;
  }

  getModel(): IBISTableColumnModel<T> {
    let model = this.staticModel;
    this.dynamicCols.forEach(
      dynamicCol => dynamicCol.keyValues.forEach(
        // @ts-ignore
        key => model[dynamicCol.keyPrefix + key] = {
          view: dynamicCol.viewGenerator(key),
          ...(dynamicCol.valueConverter && {valueConverter: dynamicCol.valueConverter})
        }
      )
    )
    return model;
  }
}

//
