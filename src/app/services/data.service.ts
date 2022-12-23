import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {AppState} from "../store";
import {apiChallengeGeneralInfo, apiChallengeSpecificInfo, apiChallengeSubmits} from "../helpers/constants/urls";
import {map, Observable, tap} from "rxjs";
import {ChallengeGeneralInfoModel, ChallengeSpecificMap, SubmitBackendModel, SubmitModel} from "../models/data.model";
import {convertSubmitsBackendModel} from "../helpers/converters/data-converter";

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
      headers: this.headers
    }).pipe(map(value => JSON.parse(value)));
  }

  /**
   * @description TF - disciplines - methods map
   */
  fetchStageSpecificInfo(): Observable<ChallengeSpecificMap[]> {
    return this.http.get<string>(apiChallengeSpecificInfo, {
      headers: this.headers
    }).pipe(map(value => JSON.parse(value)));
  }

  /**
   * @description All submits for specific discipline
   */
  fetchSubmits(discipline: string, tf: string, method: string, metrics: string[], mode: string = 'leaderboard'): Observable<SubmitModel[]> {
    console.log("fetchSubmits got", discipline);
    return this.http.get<{ submits: SubmitBackendModel[] }>(apiChallengeSubmits, {
      headers: this.headers,
      params: {
        discipline: discipline,
        tf: tf,
        method: method,
        mode: mode
      }
    }).pipe(
      tap(x => console.log("fetchSubmits get", x)),
      map(value => value.submits.map(x => convertSubmitsBackendModel(x, metrics))),
      tap(x => console.log("fetchSubmits get", x))
    );
  }
}
