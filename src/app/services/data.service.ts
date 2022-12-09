import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {AppState} from "../store";
import {apiChallengeGeneralInfo} from "../helpers/constants/urls";
import {map, Observable} from "rxjs";
import {ChallengeGeneralInfoModel, challengeStage} from "../models/challenge.model";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private headers: HttpHeaders;

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  }

  /**
   * @description Get names and views of TF, disciplines, methods
   */
  fetchChallengeGeneralInfo(): Observable<ChallengeGeneralInfoModel> {
    return this.http.get<string>(apiChallengeGeneralInfo, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
    }).pipe(map(value => JSON.parse(value)))

  }

  /**
   * @description TF - disciplines - methods map
   */
  fetchStageSpecificInfo(stage: challengeStage): Observable<ChallengeGeneralInfoModel> {
    let params = new HttpParams().set('stage', stage);
    return this.http.get<ChallengeGeneralInfoModel>(apiChallengeGeneralInfo, {headers: this.headers, params: params});
  }
}
