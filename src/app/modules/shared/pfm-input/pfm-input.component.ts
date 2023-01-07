import { Component, ElementRef, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';


@Component({
  selector: 'pfm-input',
  templateUrl: './pfm-input.component.html',
  styleUrls: ['./pfm-input.component.scss']
})
export class PfmInputComponent {
  constructor() { }

  @ViewChild('textarea') textarea!: ElementRef;
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  public models: {[heading: string]: number[][]} = {};
  public input: string = "";
  public validationMessage = "";
  public mode = "initial";
  private validationStatus = {message: "valid", index: NaN};


  submit(input: string): void {
    this.parseInput(input);
    this.changeMode();
    this.validationMessage = this.getValidationMessage();
  }


  getModels(): object | null {
    return this.models;
  }


  private changeMode(): void {
    if (this.validationStatus.message == "valid")
      this.mode = "success";
    else
      this.mode = "error";
  }


  private parseInput(input: string): void {
    let inputArray = input.split("\n"),
      models: {[heading: string]: number[][]} = {},
      currentMatrix = [],
      lastHeading = "";

    for (let i = 0; i < inputArray.length; i++) {
      let line = inputArray[i].trim();
      let matrixRow: number[] | null = this.toMatrixRow(line, i),
          heading: string | null = this.toHeading(line);

      if (!line)
        continue;

      if (matrixRow)
        currentMatrix.push(matrixRow);

      else if (heading) {
        if (currentMatrix.length != 0 && lastHeading) {
          models[lastHeading] = currentMatrix;
          currentMatrix = [];
        } else if (currentMatrix.length != 0 && !lastHeading) {
          this.setValidationStatus("Missing heading for the first matrix", i);
          return;
        } else if (!currentMatrix && lastHeading) {
          this.setValidationStatus("Heading can only span one line", i);
          return;
        }

        lastHeading = heading;
      }
    }

    if (lastHeading && currentMatrix.length != 0) {
      models[lastHeading] = currentMatrix;
      this.models = models;
      this.setValidationStatus("valid");
    } else if (!lastHeading) {
      this.setValidationStatus("Input is empty");
    }
  }


  private getValidationMessage() {
    return `Line ${this.validationStatus.index + 1}: ${this.validationStatus.message}.`
  }



  private setValidationStatus(message: string, index: number = NaN) {
    this.validationStatus = {message: message, index: index};
  }


  private toHeading(line: string): string | null {
    let heading = line.trim();

    if (!heading.startsWith(">"))
      return null;

    return heading.slice(1);
  }


  private toMatrixRow(line: string, index: number): number[] | null {
    let frequencies: number[] = line.split(/\s+|\t/).map(Number);

    if (NaN in frequencies)
      return null;

    if (frequencies.length !== 4) {
      this.setValidationStatus("Numbers of frequencies does not equal to 4", index);
      return null;
    }

    if (!this.checkRowSum(frequencies)) {
      this.setValidationStatus("The sum of frequencies does" +
        " not fit between 0.9 and 1.1", index);
      return null;
    }

    return frequencies;
  }

  private checkRowSum(row: number[]): boolean {
    let rowSum: number = row.reduce((a: number, b: number): number => a + b);
    return 0.9 < rowSum && rowSum < 1.1;
  }
}
