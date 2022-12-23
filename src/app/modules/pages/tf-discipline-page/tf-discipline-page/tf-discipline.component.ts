import {Component, OnDestroy, OnInit} from '@angular/core';
import {map, mergeMap, Observable, of, Subscription, switchMap, tap} from "rxjs";
import {metric_prefix, rank_prefix, SubmitModel} from "../../../../models/data.model";
import {IBISSortModel, IBISTableColumnModel, IBISTableDisplayedColumns} from "../../../../models/table.model";
import {MatSort, Sort} from "@angular/material/sort";
import {select, Store} from "@ngrx/store";
import {AppState, selectMetricsForDiscipline} from "../../../../store";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../../../../services/data.service";
import {round} from "../../../../helpers/helpers-functions";
import {TableDynamicColumnsService} from "../../../../services/table-dynamic-columns.service";


@Component({
  selector: 'ibis-tf-discipline-page',
  templateUrl: './tf-discipline.component.html',
  styleUrls: ['./tf-discipline.component.scss']
})
export class TfDisciplineComponent implements OnInit, OnDestroy {

  public routeParams$: Observable<{ discipline: string, tf: string, method: string }> = of({
    discipline: '',
    tf: '',
    method: ''
  });
  public metricsSet$!: Observable<string[]>;
  public submitsLoading: boolean = true;
  public submits$: Observable<SubmitModel[]> = of([]);
  public submitsToShow$: Observable<SubmitModel[]> = of([]);
  public columnModel: IBISTableColumnModel<SubmitModel> = {
    id: {
      view: "Submit ID"
    }, name: {
      view: "Name"
    }, info: {
      view: "Comment",
      disabledSort: true
    }, combinedRank: {
      view: "Aggregated rank"
    },
    team: {
      view: "Team"
    }
  };
  metricValueRounder: round;

  public displayedColumns: IBISTableDisplayedColumns<SubmitModel> = [];
  public submitsSort$: Observable<IBISSortModel> = of({direction: "asc", active: 'id'});
  private subscriptions: Subscription = new Subscription();

  private tableService: TableDynamicColumnsService<SubmitModel>;

  constructor(
    private readonly store: Store<AppState>,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly dataService: DataService) {
    this.metricValueRounder = new round(3);

    this.tableService = new TableDynamicColumnsService<SubmitModel>(
      ['id', 'name', 'info', 'combinedRank', 'team'],
      {
        id: {view: "Submit ID"},
        name: {view: "Name"},
        info: {view: "Comment", disabledSort: true},
        combinedRank: {view: "Aggregated rank"},
        team: {view: "Team"}
      }
    )
  }

  sortData(data: SubmitModel[], sort: MatSort): SubmitModel[] {
    return data;
  }

  public sortingDataAccessor =
    (data: SubmitModel, id: string): any => {
      return data[id as keyof SubmitModel];
    }

  ngOnInit(): void {
    console.log("ngOnInit")

    this.routeParams$ = this.route.paramMap.pipe(
      map(params => {
          return {
            discipline: params.get('discipline')!,
            tf: params.get('tf')!,
            method: params.get('method')!
          }
        }
      )
    )

    this.metricsSet$ = this.routeParams$.pipe(
      switchMap(params => this.store.pipe(select(selectMetricsForDiscipline, params.discipline))),
      //tap(metrics => ),
      tap(x => this.columnModel = this.tableService.getModel()),
      tap(x => this.tableService.setDynamicCols = [{
        keyPrefix: rank_prefix,
        keyValues: x,
        viewGenerator: (key) => 'Rank ' + key
      }, {
        keyPrefix: metric_prefix,
        keyValues: x,
        viewGenerator: (key) => 'Metric ' + key,
        valueConverter: this.metricValueRounder.round.bind(this.metricValueRounder)
      }]),
      tap(x => this.displayedColumns = this.tableService.getAllColumns()),
      tap(x => console.log(x, this.displayedColumns))
    )

    this.submits$ = this.submitsToShow$ = this.metricsSet$.pipe(
      mergeMap(
        metrics => this.routeParams$.pipe(
          switchMap(params => this.dataService.fetchSubmits(params.discipline, params.tf, params.method, metrics)),
          tap(x => this.submitsLoading = false),
          tap(x => console.log('this', x))
        )
      )
    )


    this.subscriptions.add(
      this.submits$.subscribe(submits => this.submitsToShow$ = of(submits))
    )
    this.subscriptions.add(
      this.metricsSet$.subscribe()
    )

  }

  saveCurrentSort($event: Sort): void {
    console.log("saveCurrentSort got", $event)
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
