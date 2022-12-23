import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {fromChallengeInfo} from "../action";
import {catchError, map, mergeMap, of} from 'rxjs';
import {DataService} from "../../services/data.service";


@Injectable()
export class ChallengeDataEffects {
  public loadGeneralData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromChallengeInfo.LoadGeneralInfo),
      mergeMap(() =>
        this.dataService.fetchChallengeGeneralInfo().pipe(
          map((info) => {
              return fromChallengeInfo.LoadGeneralInfoSuccess({info: info});
            }
          ), catchError(() => {
            return of(fromChallengeInfo.LoadGeneralInfoFailure());
          })
        )
      ), catchError(() => {
        return of(fromChallengeInfo.LoadGeneralInfoFailure());
      })
    ))

  public loadSpecificData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromChallengeInfo.LoadSpecificMaps),
      mergeMap(() =>
        this.dataService.fetchStageSpecificInfo().pipe(
          map((maps) => {
              return fromChallengeInfo.LoadSpecificMapsSuccess({maps: maps});
            }
          ), catchError(() => {
            return of(fromChallengeInfo.LoadSpecificMapsFailure());
          })
        )
      ), catchError(() => {
        return of(fromChallengeInfo.LoadSpecificMapsFailure());
      })
    ))

  constructor(private actions$: Actions, private dataService: DataService) {
  }

}
