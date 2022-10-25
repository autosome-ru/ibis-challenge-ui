import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";
import {Observable} from "rxjs";
import {GithubAuthService} from "./services/github-auth.service";
import {Location} from "@angular/common";

@Component({
  selector: 'competition-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  isCallbackPage: boolean = false;
  smallSize!: Observable<BreakpointState>;

  constructor(breakpointObserver: BreakpointObserver,
              private authService: GithubAuthService,
              private location: Location) {
    this.smallSize = breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small
      ])
  }


  ngOnInit(): void {
    this.authService.fetchUserProfileIfTokenIsSaved()

    this.isCallbackPage = this.location.path().startsWith("/callback")
  }

}
