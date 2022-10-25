import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ibis-card',
  template: '<ng-content></ng-content>',
  styleUrls: ['./ibis-card.component.scss']
})
export class IbisCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
