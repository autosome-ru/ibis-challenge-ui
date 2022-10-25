import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ibis-card-title',
  template: '<h4><ng-content></ng-content></h4>',
  styleUrls: ['./ibis-card-title.component.scss']
})
export class IbisCardTitleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
