import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {fromUser} from "../action";
import {map} from "rxjs";
import {GithubAuthService} from "../../services/github-auth.service";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class UserEffects {

  authSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUser.LoadAuthSuccess),
      map((x) => {
        this.authService.storeBearerToken(x.auth.token);
        this.authService.fetchUserProfile()
        return x;
      })
    ), {dispatch: false})

  constructor(private actions$: Actions, private authService: GithubAuthService, private http: HttpClient) {
  }

}
