import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {select, Store} from "@ngrx/store";
import {AppState, fromTeam, userAuthSelector} from "../store";
import {map, mergeMap, Observable} from "rxjs";
import {apiTeamUrl} from "../helpers/constants/urls";
import {TeamProfileModel} from "../models/team.model";

@Injectable({
  providedIn: 'root'
})
export class TeamLoadingService {

  tokenStore$: Observable<string | undefined> = this.store.pipe(select(userAuthSelector)).pipe(map(x => x?.token));

  constructor(private readonly http: HttpClient,
              private readonly store: Store<AppState>
  ) {
  }

  loadTeams(): void {
    this.store.dispatch(fromTeam.LoadTeamProfile())
    this.tokenStore$.pipe(
      mergeMap((token) =>
        this.http.get<TeamProfileModel>(apiTeamUrl,
          {
            headers: new HttpHeaders()
              .set('Authorization', `Bearer ${token}`)
              .set('Content-Type', 'application/json; charset=utf-8')
          }))
    ).subscribe({
      next: (profile) => {
        this.store.dispatch(fromTeam.LoadTeamProfileSuccess({team: profile}));
      },
      error: (error) => {
        this.store.dispatch(fromTeam.LoadTeamProfileFailure({error: error.message}));
      }
    })
  }
}
