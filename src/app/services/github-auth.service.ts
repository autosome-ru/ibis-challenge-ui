import {Injectable, NgZone} from '@angular/core';
import {convertParamsToUrl} from "../helpers/helpers-functions";
import {CookiesService} from "./cookies.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AppState, fromUser, userAuthSelector} from "../store";
import {select, Store} from "@ngrx/store";
import {AuthModel, UserProfileModel} from "../models/user.model";
import {mergeMap, Observable} from "rxjs";
import {Router} from "@angular/router";
import {apiAuthProfileUrl, apiAuthUrl} from "../helpers/constants/urls";
import {githubAuthorizeUrl, githubClientId, githubRedirectUrl} from "../helpers/constants/github.info";

@Injectable({
  providedIn: 'root',
})
export class GithubAuthService {
  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  tokenFieldName: string = "token";


  userAuthStore$: Observable<AuthModel | null> = this.store.pipe(select(userAuthSelector))

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
      next: (token) => {
        this.store.dispatch(fromUser.LoadAuthSuccess({auth: token}))
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
      next: (profile) => {
        this.store.dispatch(fromUser.LoadProfileSuccess({user: profile}))
      },
      error: (error) => {
        this.store.dispatch(fromUser.LoadProfileFailure({error: error.message}))
      }
    })
  }

  logoutGithub(): void {
    this.cookiesService.removeElement(this.tokenFieldName);
    this.store.dispatch(fromUser.ClearUser());
    this.router.navigate(['']);
  }
}
