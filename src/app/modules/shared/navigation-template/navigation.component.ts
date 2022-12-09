import {AfterViewInit, Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'ibis-nav',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationComponent implements AfterViewInit {
  public navIsClosed: boolean = true;
  public sidenav_opened: boolean = false;
  public navLinks = [
    {name: 'Home', icon: 'home', link: 'home'},
    {name: 'Profile', icon: 'account_box', link: 'profile'},
    {name: 'About us', icon: 'groups_icon', link: 'about_us'}
  ];
  public testLinks = [
    {name: 'Team\'s submits', icon: 'looks_one', link: 'team_submits'},
    {name: 'TF & discipline', icon: 'looks_two', link: 'tf_discipline'},
    {name: 'Single discipline', icon: 'looks_3', link: 'single_discipline'},
    {name: 'All disciplines', icon: 'looks_4', link: 'all_disciplines'}
  ];
  public creationDate: Date = new Date(2022);
  public currentDate: Date = new Date();

  constructor() {

  }

  ngAfterViewInit(): void {
  }
}
