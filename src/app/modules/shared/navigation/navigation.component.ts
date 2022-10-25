import {AfterViewInit, Component, Input} from '@angular/core';

@Component({
  selector: 'competition-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements AfterViewInit {
  @Input()
  isSmallSize?: boolean = false;
  navIsClosed: boolean = true;

  constructor() {
  }

  ngAfterViewInit(): void {
    console.log(this.navIsClosed)
  }

}
