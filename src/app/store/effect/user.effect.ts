import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {fromUsers} from "../action";
import {map} from "rxjs";
import {SocialAuthService} from "../../services/social-auth.service";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class UserEffects {

  authSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUsers.LoadAuthSuccess),
      map((x) => {
        this.authService.storeBearerToken(x.auth.token);
        this.authService.fetchUserProfile()
        return x;
      })
    ), {dispatch: false})

  constructor(private actions$: Actions, private authService: SocialAuthService, private http: HttpClient) {
  }

}
