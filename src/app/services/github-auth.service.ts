import {Injectable, NgZone} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {filter, mergeMap, Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {convertParamsToUrl} from "../helpers/helpers-functions";
import {CookiesService} from "./cookies.service";
import {AppState, fromUser, userAuthSelector} from "../store";
import {AuthModel, UserProfileModel} from "../models/user.model";
import {apiAuthProfileUrl, apiAuthUrl} from "../helpers/constants/urls";
import {githubAuthorizeUrl, githubClientId, githubRedirectUrl} from "../helpers/constants/github.info";
import {
  convertAuthBackendToAuthModel,
  convertUserProfileBackendToUserProfileModel
} from "../helpers/converters/user-converter";

@Injectable({
  providedIn: 'root',
})
export class GithubAuthService {
  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  tokenFieldName: string = "token";


  userAuthStore$: Observable<AuthModel | null> = this.store.pipe(select(userAuthSelector)).pipe(
    filter(value => value !== undefined),
    filter(value => value !== null)
  )

  constructor(private readonly http: HttpClient,
              private readonly ngZone: NgZone,
              private readonly cookiesService: CookiesService,
              private readonly store: Store<AppState>,
              private readonly router: Router) {
  }

  openGithubLoginWindow() {
    this.store.dispatch(fromUser.LoadAuth())
    return window.open(
      convertParamsToUrl(githubAuthorizeUrl, {
        client_id: githubClientId,
        redirect_uri: githubRedirectUrl
      }), "_blank", `rel="noopener noreferrer"`
    )
  }

  sendAuthCodeToBackend(code: string): void {
    this.http.post<AuthModel>(apiAuthUrl,
      {'code': code},
      {headers: this.headers}).subscribe({
      next: (tokenBackend) => {
        this.store.dispatch(fromUser.LoadAuthSuccess({auth: convertAuthBackendToAuthModel(tokenBackend)}))
      },
      error: (error) => {
        this.store.dispatch(fromUser.LoadAuthFailure({error: error.message}))
      }
    })
  }

  getAuthCode() {
    const newWindow: Window = this.openGithubLoginWindow() as Window;

    const newListener = () => {
      const code = newWindow.sessionStorage.getItem('code');
      if (code) {
        this.ngZone.run(() => this.sendAuthCodeToBackend(code));
      }
    }
    newWindow.addEventListener("beforeunload", newListener)
  }

  storeBearerToken(token_value: string): void {
    this.cookiesService.setElement(this.tokenFieldName, token_value)
  }

  fetchUserProfileIfTokenIsSaved(): boolean {
    let token = this.cookiesService.getElementById(this.tokenFieldName);
    if (token) {
      // token exists in cookie
      this.store.dispatch(fromUser.LoadAuth());
      this.store.dispatch(fromUser.LoadAuthSuccess({auth: {token: token}}));
      return true;
    }
    return false
  }

  loginGithub(): void {
    let cookieResult = this.fetchUserProfileIfTokenIsSaved();
    if (!cookieResult) {
      // token doesn't exist in cookie
      this.getAuthCode();
    }
    return;
  }

  fetchUserProfile(): void {
    this.store.dispatch(fromUser.LoadProfile());

    this.userAuthStore$.pipe(
      mergeMap((auth) =>
        this.http.get<UserProfileModel>(apiAuthProfileUrl,
          {
            headers: new HttpHeaders()
              .set('Authorization', `Bearer ${auth?.token}`)
              .set('Content-Type', 'application/json; charset=utf-8')
          }))
    ).subscribe({
      next: (profileBackend) => {
        this.store.dispatch(fromUser.LoadProfileSuccess({user: convertUserProfileBackendToUserProfileModel(profileBackend)}));
      },
      error: (error) => {
        this.store.dispatch(fromUser.LoadProfileFailure({error: error.message}));
        console.warn(error);
        this.checkBackendError(error);
      }
    })
  }

  checkBackendError(error: any) {
    if (error.error.message == 'token expired') {
      this.logoutGithubAndForgetToken();
    }
  }

  logoutGithub(): void {
    console.log("logoutGithub")
    this.store.dispatch(fromUser.ClearUser());
    this.router.navigate(['']);
  }

  logoutGithubAndForgetToken(): void {
    console.log("logoutGithubAndForgetToken")
    this.cookiesService.removeElement(this.tokenFieldName);
    this.store.dispatch(fromUser.ClearUser());
    this.router.navigate(['']);
  }
}
