import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {fromChallengeInfo} from "../action";
import {catchError, map, mergeMap, of} from 'rxjs';
import {DataService} from "../../services/data.service";


@Injectable()
export class ChallengeDataEffects {
  public loadData$ = createEffect(() =>
    this.actions$.pipe(
      map(val => {
        //console.log(val);
        return val;
      }),
      ofType(fromChallengeInfo.LoadGeneralInfo),
      mergeMap(() =>
        this.dataService.fetchChallengeGeneralInfo().pipe(
          map((info) => {
              console.log(info);
              return fromChallengeInfo.LoadGeneralInfoSuccess({info: info});
            }
          ), catchError(() => {
            return of(fromChallengeInfo.LoadGeneralInfoFailure());
          })
        )
      )
    ))

  constructor(private actions$: Actions, private dataService: DataService) {
  }

}
