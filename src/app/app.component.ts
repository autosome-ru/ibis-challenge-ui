import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {GithubAuthService} from "./services/github-auth.service";
import {Location} from "@angular/common";
import {AppState, fromChallengeInfo, fromUser} from "./store";
import {Store} from "@ngrx/store";

@Component({
  selector: 'competition-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {


  isCallbackPage: boolean = false;

  constructor(private authService: GithubAuthService,
              private location: Location,
              private readonly store: Store<AppState>) {
    //console.log(leaderboardDisciplinesAndTFs);
    //console.log(leaderboardTFs);
    //console.log(leaderboardDisciplines)
  }


  ngOnInit(): void {
    //this.authService.fetchUserProfileIfTokenIsSaved();

    this.isCallbackPage = this.location.path().startsWith("/callback");

    this.store.dispatch(fromUser.LoadAuthFromCookie());
    this.store.dispatch(fromChallengeInfo.LoadGeneralInfo());
  }

}
