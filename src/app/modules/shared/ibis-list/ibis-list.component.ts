import {Component, Input, OnInit, TemplateRef} from '@angular/core';

@Component({
  selector: 'ibis-list',
  templateUrl: './ibis-list.component.html',
  styleUrls: ['./ibis-list.component.scss']
})
export class IbisListComponent implements OnInit {
  @Input()
  public template!: TemplateRef<any>;

  constructor() { }

  ngOnInit(): void {
    console.log(this.template)
  }

}
