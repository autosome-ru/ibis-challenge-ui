import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {select, Store} from "@ngrx/store";
import {AppState, fromTeam, userAuthSelector} from "../store";
import {map, mergeMap, Observable} from "rxjs";
import {apiTeamUrl} from "../helpers/constants/urls";
import {TeamProfileBackendModel, TeamProfileModel} from "../models/team.model";
import {convertTeamProfileBackendToTeamProfileModel} from "../helpers/converters/team-converter";

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
        this.http.get<TeamProfileBackendModel>(apiTeamUrl,
          {
            headers: new HttpHeaders()
              .set('Authorization', `Bearer ${token}`)
              .set('Content-Type', 'application/json; charset=utf-8')
          }))
    ).subscribe({
      next: (profileBackend) => {
        console.log(profileBackend)
        this.store.dispatch(fromTeam.LoadTeamProfileSuccess({team: convertTeamProfileBackendToTeamProfileModel(profileBackend)}));
      },
      error: (error) => {
        this.store.dispatch(fromTeam.LoadTeamProfileFailure({error: error.message}));
      }
    })
  }

  sendTeams(teams: TeamProfileModel): void {
    this.store.dispatch(fromTeam.LoadTeamProfile())
    this.tokenStore$.pipe(
      mergeMap((token) =>
        this.http.post<TeamProfileBackendModel>(apiTeamUrl, teams,
          {
            headers: new HttpHeaders()
              .set('Authorization', `Bearer ${token}`)
              .set('Content-Type', 'application/json; charset=utf-8')
          }))
    ).subscribe({
      next: (profileBackend) => {
        this.store.dispatch(fromTeam.LoadTeamProfileSuccess({team: convertTeamProfileBackendToTeamProfileModel(profileBackend)}));
      },
      error: (error) => {
        this.store.dispatch(fromTeam.LoadTeamProfileFailure({error: error.message}));
      }
    })
  }
}
