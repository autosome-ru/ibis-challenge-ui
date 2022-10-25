import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ibis-card-footer',
  template: '<ng-content></ng-content>',
  styleUrls: ['./ibis-card-footer.component.scss']
})
export class IbisCardFooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
