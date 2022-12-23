import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {GithubAuthService} from "../../../services/github-auth.service";
import {select, Store} from "@ngrx/store";
import {AppState, userProfileSelector} from "../../../store";
import {UserProfileModel} from "../../../models/user.model";
import {LayoutBaseComponent} from "../../../components/shared/layout-base/layout-base.component";
import {BreakpointObserver} from "@angular/cdk/layout";
import {map} from "rxjs";

@Component({
  selector: 'competition-sign-in-with',
  templateUrl: './sign-in-with.component.html',
  styleUrls: ['./sign-in-with.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInWithComponent extends LayoutBaseComponent {
  //@Input()
  //public notSignedInMsg: string = "Sign in with Github";
  public notSignedInMsg = "Sign in with GitHub";
  public notSignedInMsgShort = "Sign in";

  public isLoadingUser$ = this.store.pipe(select(userProfileSelector), map(x => x.loading));
  public isLoadedUser$ = this.store.pipe(select(userProfileSelector), map(x => x.loaded));
  public User$ = this.store.pipe(select(userProfileSelector), map(x => x.data));
  public user!: UserProfileModel | null;

  constructor(private github: GithubAuthService, private store: Store<AppState>, protected override breakpointObserver: BreakpointObserver, protected override cdr: ChangeDetectorRef) {
    super(breakpointObserver, cdr);
  }

  onSignInPressed() {
    this.github.loginGitHub()
  }
}
