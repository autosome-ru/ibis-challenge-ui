import {Component, Input} from '@angular/core';
import {GithubAuthService} from "../../../services/github-auth.service";
import {HttpHeaders} from '@angular/common/http';
import {select, Store} from "@ngrx/store";
import {AppState, isLoadedUserSelector, isLoadingUserSelector, userProfileSelector} from "../../../store";
import {UserProfileModel} from "../../../models/user.model";

@Component({
  selector: 'competition-sign-in-with',
  templateUrl: './sign-in-with.component.html',
  styleUrls: ['./sign-in-with.component.scss']
})
export class SignInWithComponent {
  @Input()
  public notSignedInMsg: string = "Sign in with Github";
  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  isLoadingUser$ = this.store.pipe(select(isLoadingUserSelector));
  isLoadedUser$ = this.store.pipe(select(isLoadedUserSelector));
  User$ = this.store.pipe(select(userProfileSelector));
  user!: UserProfileModel | null;

  constructor(private github: GithubAuthService, private store: Store<AppState>) {
  }


  onSignInPressed() {
    this.github.loginGithub()
  }
}
