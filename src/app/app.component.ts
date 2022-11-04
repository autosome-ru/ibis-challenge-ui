import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {GithubAuthService} from "./services/github-auth.service";
import {Location} from "@angular/common";

@Component({
  selector: 'competition-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {


  isCallbackPage: boolean = false;

  constructor(private authService: GithubAuthService,
              private location: Location) {
  }


  ngOnInit(): void {
    this.authService.fetchUserProfileIfTokenIsSaved()

    this.isCallbackPage = this.location.path().startsWith("/callback")
  }

}
