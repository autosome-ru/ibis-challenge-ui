import {AfterViewInit, Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'competition-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationComponent implements AfterViewInit {
  public navIsClosed: boolean = true;
  public sidenav_opened: boolean = false;
  public navLinks = [
    {name: 'Home', icon: 'home', link: 'home'},
    {name: 'Profile', icon: 'account_box', link: 'profile'}
  ];
  public creationDate: Date = new Date(2022);
  public currentDate: Date = new Date();

  constructor() {

  }

  ngAfterViewInit(): void {
    console.log(this.navIsClosed)
  }
}
