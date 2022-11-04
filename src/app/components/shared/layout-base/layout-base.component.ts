import {Component} from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-layout-base',
  template: '',
  styles: [''],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutBaseComponent {
  public breakpointsMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  constructor(protected breakpointObserver: BreakpointObserver) {
  }

  isXLargeSize(): boolean {
    console.log(Breakpoints.XLarge, this.breakpointObserver.isMatched([Breakpoints.XLarge]));
    return this.breakpointObserver.isMatched([Breakpoints.XLarge])
  }

  isLargeSize(): boolean {
    console.log(Breakpoints.Large, this.breakpointObserver.isMatched([Breakpoints.Large]));
    return this.breakpointObserver.isMatched([Breakpoints.Large])
  }

  isMediumSize(): boolean {
    console.log(Breakpoints.Medium, this.breakpointObserver.isMatched([Breakpoints.Medium]));
    return this.breakpointObserver.isMatched([Breakpoints.Medium])
  }

  isSmallSize(): boolean {
    return this.breakpointObserver.isMatched([Breakpoints.Small])
  }

  isXSmallSize(): boolean {
    return this.breakpointObserver.isMatched([Breakpoints.XSmall])
  }

  isHandset(): boolean {
    return this.breakpointObserver.isMatched([Breakpoints.Handset])
  }

  isTablet(): boolean {
    return this.breakpointObserver.isMatched([Breakpoints.Tablet])
  }

  isWeb(): boolean {
    console.log(Breakpoints.Web, this.breakpointObserver.isMatched([Breakpoints.Web]));
    return this.breakpointObserver.isMatched([Breakpoints.Web])
  }

}
