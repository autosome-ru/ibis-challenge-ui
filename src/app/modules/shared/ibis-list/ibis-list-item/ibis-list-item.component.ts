import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ibis-list-item',
  templateUrl: './ibis-list-item.component.html',
  styleUrls: ['./ibis-list-item.component.scss']
})
export class IbisListItemComponent implements OnInit {

  @Input()
  index: number | null = null;
  content: any;

  constructor() {
  }

  ngOnInit(): void {
  }

}
