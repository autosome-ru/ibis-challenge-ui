import {Injectable} from "@angular/core";
import {Actions, concatLatestFrom, createEffect, ofType} from "@ngrx/effects";
import {catchError, filter, mergeMap, of} from "rxjs";
import {fromTeam, fromUser} from "../action";
import {TeamLoadingService} from "../../services/team-loading.service";
import {userAuthSelector} from "../selector";
import {Store} from "@ngrx/store";
import {AppState} from "../reducer";

@Injectable()
export class TeamEffects {

  public authLoadSuccessForTeamProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUser.LoadAuthSuccess),
      mergeMap(() =>
        of(fromTeam.LoadTeamProfile())
      )
    )
  )
  // public authLoadSuccessForTeamMembers$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(fromUser.LoadAuthSuccess),
  //     mergeMap(() =>
  //       of(fromTeam.LoadTeamMembers())
  //     )
  //   )
  // )

  public loadTeamProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromTeam.LoadTeamProfile),
      concatLatestFrom(() => this.store.select(userAuthSelector)),
      filter(([_, auth]) => auth.loaded),
      mergeMap(([_, auth]) =>
        this.teamService.fetchTeam(auth.data!.token).pipe(
          mergeMap((team) =>
            of(fromTeam.LoadTeamProfileSuccess({team: team}))
          ),
          catchError((error) => of(fromTeam.LoadTeamProfileFailure()))
        )
      ),
      catchError((error) => of(fromTeam.LoadTeamProfileFailure()))
    )
  )

  constructor(private actions$: Actions, private teamService: TeamLoadingService, private store: Store<AppState>) {
  }

}
