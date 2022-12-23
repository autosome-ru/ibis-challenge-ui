import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment
} from '@angular/router';
import {from, map, Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import * as fromSelectors from "src/app/store/selector";
import {AppState} from "../store/reducer";
import {Store} from "@ngrx/store";
import {AuthModel} from "../models/user.model";
import {Location} from "@angular/common";

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private store: Store<AppState>,
              private location: Location,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkAndNavigate(state.url);
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.checkAndNavigate(
      this.location.normalize(!!segments && segments.length > 0 ?
        segments.map(s => s.path).join('/') : '/')
    );
  }

  checkAndNavigate(url: string): Observable<boolean> {
    return this.store.select(fromSelectors.userAuthSelector).pipe(
      map(x => x.data),
      //filter(value => value !== null),
      switchMap((user: AuthModel | null) => {
        if (!user || !user.token) {
          return from(this.router.navigate(['/login'], {
            queryParams: url ? {
              return: url
            } : {},
            replaceUrl: true
          }).then(
            () => false
          ));
        } else {
          return of(true);
        }
      })
    );
  }
}
