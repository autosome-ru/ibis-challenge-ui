import {Injectable} from "@angular/core";
import {Actions, concatLatestFrom, createEffect, ofType} from "@ngrx/effects";
import {fromUser} from "../action";
import {catchError, filter, iif, mergeMap, of, tap} from "rxjs";
import {GithubAuthService} from "../../services/github-auth.service";
import {Store} from "@ngrx/store";
import {AppState} from "../reducer";
import {userAuthSelector} from "../selector";

// https://dev.to/this-is-angular/ngrx-tips-i-needed-in-the-beginning-4hno#dont-dispatch-actions-conditionally

@Injectable()
export class UserEffects {


  // public ifAuthNotLoaded$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(fromUser.LoadAuth),
  //     concatLatestFrom(() => this.store.select(userAuthSelector)),
  //     filter(([, auth]) => !auth.loaded),
  //     map(() => fromUser.LoadAuth())
  //   )
  // )
  //
  // public ifAuthLoaded$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(fromUser.LoadAuth),
  //     concatLatestFrom(() => this.store.select(userAuthSelector)),
  //     filter(([, auth]) => auth.loaded),
  //     map(() => fromUser.LoadProfile())
  //   )
  // )


  // public authLoad$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(fromUser.LoadAuth),
  //     mergeMap(() =>
  //       this.authService.fetchGitHubToken().pipe(
  //         mergeMap((tokenInfo) =>
  //           iif(
  //             () => tokenInfo.fromCookie,
  //             of(fromUser.LoadAuthFromCookieSuccess({auth: tokenInfo.auth})),
  //             of(fromUser.LoadAuthFromGitHubSuccess({auth: tokenInfo.auth}))
  //           )
  //         )
  //       )
  //     )
  //   ))

  public authLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUser.LoadAuth),
      mergeMap(() =>
        iif(
          () => this.authService.doesGitHubTokenCookieExist(),
          of(fromUser.LoadAuthFromCookie()),
          of(fromUser.LoadAuthFromGitHub())
        )
      )
    ))

  public authLoadFromCookie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUser.LoadAuthFromCookie),
      mergeMap(() =>
        this.authService.fetchTokenFromCookie().pipe(
          mergeMap((auth) =>
            of(fromUser.LoadAuthFromCookieSuccess({auth: auth}))
          ),
          catchError((error) => of(fromUser.LoadAuthFailure()))
        )
      ),
      catchError((error) => of(fromUser.LoadAuthFailure()))
    )
  )

  public authLoadFromGitHub$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUser.LoadAuthFromGitHub),
      mergeMap(() =>
        this.authService.fetchTokenFromGitHub().pipe(
          mergeMap((auth) =>
            of(fromUser.LoadAuthFromGitHubSuccess({auth: auth}))
          ),
          catchError((error) => of(fromUser.LoadAuthFailure()))
        )
      ),
      catchError((error) => of(fromUser.LoadAuthFailure()))
    )
  )

  public authLoadFromCookieSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUser.LoadAuthFromCookieSuccess),
      mergeMap(() =>
        of(fromUser.LoadAuthSuccess())
      )
    )
  )

  public authLoadFromGitHubSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUser.LoadAuthFromGitHubSuccess),
      concatLatestFrom(() => this.store.select(userAuthSelector)),
      tap(([, auth]) => this.authService.storeCookie(auth.data!)),
      mergeMap(() =>
        of(fromUser.LoadAuthSuccess())
      )
    )
  )

  public authLoadSuccessForUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUser.LoadAuthSuccess),
      mergeMap(() =>
        of(fromUser.LoadProfile())
      )
    )
  )

  public loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUser.LoadProfile),
      concatLatestFrom(() => this.store.select(userAuthSelector)),
      filter(([_, auth]) => auth.loaded),
      mergeMap(([_, auth]) =>
        this.authService.fetchUser(auth.data!.token).pipe(
          mergeMap((profile) =>
            of(fromUser.LoadProfileSuccess({user: profile}))
          ),
          catchError((error) => of(fromUser.LoadProfileFailure()))
        )
      ),
      catchError((error) => of(fromUser.LoadProfileFailure()))
    )
  )

  public loadProfileFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUser.LoadProfileFailure),
      tap(() => this.authService.clearCookie()),
      mergeMap(() =>
        of(fromUser.ClearUser())
      )
    )
  )


  // authSuccess$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(fromUser.LoadAuthSuccess),
  //     map((x) => {
  //       //this.authService.storeBearerToken(x.auth.token);
  //       //this.authService.fetchUserProfile()
  //       return x;
  //     })
  //   ), {dispatch: false})

  constructor(private actions$: Actions, private authService: GithubAuthService, private store: Store<AppState>) {
  }

}
