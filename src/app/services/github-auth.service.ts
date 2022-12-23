import {Injectable} from '@angular/core';
import {fromEvent, mergeMap, Observable, of} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState, fromUser} from "../store";
import {CookiesService} from "./cookies.service";
import {convertParamsToUrl} from "../helpers/helpers-functions";
import {githubAuthorizeUrl, githubClientId, githubRedirectUrl} from "../helpers/constants/github.info";
import {AuthModel, UserProfileModel} from "../models/user.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {apiAuthProfileUrl, apiAuthUrl} from "../helpers/constants/urls";

/*
@Injectable({
  providedIn: 'root',
})
export class GithubAuthService {
  headers: HttpHeaders;
  tokenFieldName: string = "token";


  userAuthStore$: Observable<AuthModel | null> = this.store.pipe(select(userAuthSelector)).pipe(
    filter(value => value !== undefined),
    filter(value => value !== null),
    map(data => data.data)
  )

  constructor(private readonly http: HttpClient,
              private readonly ngZone: NgZone,
              private readonly cookiesService: CookiesService,
              store: Store<AppState>,
              private readonly router: Router) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  }

  openGithubLoginWindow() {
    this.store.dispatch(fromUser.LoadAuth());
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
        console.warn("BACKEND TOKEN", tokenBackend)
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
    let token = this.cookiesService.getElement(this.tokenFieldName);
    if (token) {
      // token exists in cookie
      console.warn("COOKIE TOKEN", token)
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
    this.store.dispatch(fromUser.ClearUser());
    this.router.navigate(['']);
  }

  logoutGithubAndForgetToken(): void {
    this.cookiesService.removeElement(this.tokenFieldName);
    this.store.dispatch(fromUser.ClearUser());
    this.router.navigate(['']);
  }
} */
@Injectable({
  providedIn: 'root',
})
export class GithubAuthService {
  private tokenFieldName: string = "token";
  private headers;

  constructor(private readonly store: Store<AppState>,
              private readonly cookiesService: CookiesService,
              private readonly http: HttpClient) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
  }

  loginGitHub() {
    this.store.dispatch(fromUser.LoadAuth())
  }

  openGithubLoginWindow(): WindowProxy {
    let window_ = window.open(
      convertParamsToUrl(githubAuthorizeUrl, {
        client_id: githubClientId,
        redirect_uri: githubRedirectUrl
      }), "_blank", `rel="noopener noreferrer"`
    )
    if (window_ == null) {
      throw 'Cannot open GitHub window'
    }
    return window_;
  }

  // fetchGitHubToken(): Observable<{ auth: AuthModel, fromCookie: boolean }> {
  //   if (this.doesGitHubTokenCookieExist()) {
  //     // token already exists in cookie
  //     return of({
  //       auth: {token: this.cookiesService.getElement(this.tokenFieldName)!},
  //       fromCookie: true
  //     })
  //   } else {
  //     // fetch token from GitHub
  //     const GitHubWindow: WindowProxy = this.openGithubLoginWindow();
  //     return fromEvent(GitHubWindow, 'beforeunload').pipe(
  //       mergeMap(() => of({
  //         auth: {token: GitHubWindow.sessionStorage.getItem('code')!},
  //         fromCookie: false
  //       }))
  //     )
  //   }
  // }

  doesGitHubTokenCookieExist(): boolean {
    return this.cookiesService.doesElementExist(this.tokenFieldName)
  }

  fetchTokenFromCookie(): Observable<AuthModel> {
    let value = this.cookiesService.getElement(this.tokenFieldName);
    if (!this.doesGitHubTokenCookieExist()) {
      throw "Cookie does not exist";
    }
    return of({token: value!});
  }

  fetchTokenFromGitHub(): Observable<AuthModel> {
    const GitHubWindow: WindowProxy = this.openGithubLoginWindow();
    return fromEvent(GitHubWindow, 'beforeunload').pipe(
      mergeMap(() => of(GitHubWindow.sessionStorage.getItem('code')!))
    ).pipe(
      mergeMap(code =>
        this.http.post<AuthModel>(apiAuthUrl,
          {'code': code},
          {headers: this.headers})
      )
    )
  }

  fetchUser(token: string): Observable<UserProfileModel> {
    return this.http.get<UserProfileModel>(apiAuthProfileUrl,
      {
        headers: this.headers.set('Authorization', `Bearer ${token}`)
      })
  }

  clearCookie(): void {
    this.cookiesService.removeElement(this.tokenFieldName);
  }

  storeCookie(auth: AuthModel) {
    this.cookiesService.setElement(this.tokenFieldName, auth.token);
  }
}

