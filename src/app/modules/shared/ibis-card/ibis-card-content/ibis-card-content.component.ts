import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {EFlexDirection} from "../../../../models/styles";

@Component({
  selector: 'ibis-card-content',
  template: '<ng-content></ng-content>',
  styleUrls: ['./ibis-card-content.component.scss']
})
export class IbisCardContentComponent implements OnInit {

  @HostBinding("style.--flex-direction")
  @Input()
  direction?: EFlexDirection = EFlexDirection.row;

  @HostBinding("style.--times")
  gap: number = 1;

  constructor() {
    // if (this.direction === EFlexDirection.row) {
    //   this.gap = 1;
    // } else {
    //   this.gap = 2;
    // }
  }

  ngOnInit(): void {
  }

}
