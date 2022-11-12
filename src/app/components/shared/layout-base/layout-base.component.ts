import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Subject, takeUntil} from "rxjs";

type DisplaySize = 'XSmall' | 'Small' | 'Medium' | 'Large' | 'XLarge';

@Component({
  selector: 'app-layout-base',
  template: '',
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutBaseComponent implements OnInit {
  layoutDestroyed = new Subject<void>();


  public breakpointsMap = new Map<DisplaySize, string>([
    ['XSmall', Breakpoints.XSmall],
    ['Small', Breakpoints.Small],
    ['Medium', Breakpoints.Medium,],
    ['Large', Breakpoints.Large,],
    ['XLarge', Breakpoints.XLarge],
  ]);
  public breakpointsOrder: DisplaySize[] = ['XSmall', 'Small', 'Medium', 'Large', 'XLarge']

  constructor(protected breakpointObserver: BreakpointObserver, protected cdr: ChangeDetectorRef) {

  }

  isDisplayOfGivenSize(size: DisplaySize): boolean {
    return this.breakpointObserver.isMatched(this.breakpointsMap.get(size)!);
  }

  isDisplayBiggerThan(size: DisplaySize): boolean {
    let idx = this.breakpointsOrder.indexOf(size);
    let subset = this.breakpointsOrder.slice(idx);
    let subsetBps = subset.map(x => this.breakpointsMap.get(x)!);
    return this.breakpointObserver.isMatched(subsetBps);
  }

  isDisplayLesserThan(size: DisplaySize): boolean {
    let idx = this.breakpointsOrder.indexOf(size);
    let subset = this.breakpointsOrder.slice(0, idx + 1);
    let subsetBps = subset.map(x => this.breakpointsMap.get(x)!);
    return this.breakpointObserver.isMatched(subsetBps);
  }


  ngOnInit(): void {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.layoutDestroyed))
      .subscribe(_ => {
        this.cdr.detectChanges();
      });
  }

}
