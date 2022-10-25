import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

@Component({
  selector: 'competition-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeComponent implements OnInit, DoCheck {

  @Input()
  full_code: string = "some code";
  @Input()
  timePerChar: number = 35;
  @Input()
  timeBeforeExecution: number = 500;
  @Input()
  timeBeforeCompletion: number = 1000;
  @Input()
  willBePrinted: boolean = true;

  @Output()
  printed = new EventEmitter<boolean>();
  @Output()
  run = new EventEmitter<boolean>();
  @Output()
  completed = new EventEmitter<boolean>();

  code: string = "";
  isRunning: boolean = false;
  isCompleted: boolean = false;

  iterator!: IterableIterator<string>;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngDoCheck(): void {
    this.cdr.markForCheck();
  }

  setRunning() {
    this.run.emit(true);
    this.isRunning = true;
    setTimeout(this.setComplete.bind(this), this.timeBeforeCompletion)
  }

  setComplete() {
    this.completed.emit(true);
    this.isRunning = false;
    this.isCompleted = true;
  }

  moveByChars() {
    this.ngDoCheck();
    let newChar = this.iterator.next().value;
    if (newChar) {
      this.code += newChar
      setTimeout(this.moveByChars.bind(this), this.timePerChar)
    } else {
      // printing complete
      this.printed.emit(true);
      setTimeout(this.setRunning.bind(this), this.timeBeforeExecution)
    }
  }

  ngOnInit(): void {
    this.iterator = this.full_code[Symbol.iterator]()
    if (this.willBePrinted) {
      this.moveByChars()
    }
  }
}



