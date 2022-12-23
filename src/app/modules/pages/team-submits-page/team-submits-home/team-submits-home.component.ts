import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";
import {
  allTFs,
  getFullNameOfSubDiscipline,
  getFullNameOfSuperDiscipline,
  getFullNameOfTF,
  leaderboardTFsPerDiscipline,
  subDisciplines,
  superDisciplines
} from "../../../../helpers/constants/leaderboard";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {filter, Subscription} from "rxjs";

const tableTestData = {
  "metrics_order": [
    "Metric name #0",
    "Metric name #1",
    "Metric name #2"
  ],
  "submits": [
    {
      "submit_id": 0,
      "submit_info": "Comment for submit # 0",
      "submit_metrics": [
        0.9971848109388686,
        0.9325573593386588,
        0.12812444792935673
      ],
      "submit_ranks": [
        1,
        0,
        4
      ],
      "submit_aggregated_rank": 4
    },
    {
      "submit_id": 1,
      "submit_info": "Comment for submit # 1",
      "submit_metrics": [
        0.9990405153241447,
        0.23608897695197606,
        0.3965807272960261
      ],
      "submit_ranks": [
        0,
        3,
        3
      ],
      "submit_aggregated_rank": 1
    },
    {
      "submit_id": 2,
      "submit_info": "Comment for submit # 2",
      "submit_metrics": [
        0.3879107411620074,
        0.66974603680348,
        0.9355390708060318
      ],
      "submit_ranks": [
        4,
        1,
        0
      ],
      "submit_aggregated_rank": 3
    },
    {
      "submit_id": 3,
      "submit_info": "Comment for submit # 3",
      "submit_metrics": [
        0.8463109166860171,
        0.3132735169322751,
        0.5245481595728714
      ],
      "submit_ranks": [
        2,
        2,
        2
      ],
      "submit_aggregated_rank": 0
    },
    {
      "submit_id": 4,
      "submit_info": "Comment for submit # 4",
      "submit_metrics": [
        0.44345289377955666,
        0.22957721372982554,
        0.534413908947017
      ],
      "submit_ranks": [
        3,
        4,
        1
      ],
      "submit_aggregated_rank": 2
    }
  ],
  "discipline_name": "A2G_PWM",
  "tf_name": "NACC2"
}


export function containsInArrayValidator(permittedValues: readonly string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = !permittedValues.includes(control.value);
    return forbidden ? {notContainingName: {value: control.value}} : null;
  };
}

export function containsInArrayGetterValidator(permittedValuesGetter: () => string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let permittedValues = permittedValuesGetter();
    const forbidden = !permittedValues.includes(control.value);
    return forbidden ? {notContainingName: {value: control.value}} : null;
  };
}


@Component({
  selector: 'app-team-submits-home',
  templateUrl: './team-submits-home.component.html',
  styleUrls: ['./team-submits-home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TeamSubmitsHomeComponent implements OnInit, OnDestroy {
  disciplineOptions = superDisciplines;
  methodsOptions = subDisciplines;
  tfOptions: string[] = [];
  selectionControl = new FormGroup({
    discipline: new FormControl('', containsInArrayGetterValidator(() => this.getDisciplineOptions)),
    method: new FormControl('', containsInArrayGetterValidator(() => this.getMethodsOptions)),
    tf: new FormControl('', containsInArrayGetterValidator(() => this.getTFOptions))
  })
  disciplinesTFmap = leaderboardTFsPerDiscipline;
  panelOpenState: boolean = true;
  private componentSubs: Subscription = new Subscription();

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  public get getDisciplineOptions(): string[] {
    return [...this.disciplineOptions];
  }

  public get getMethodsOptions(): string[] {
    return [...this.methodsOptions];
  }

  public get getTFOptions(): string[] {
    return [...this.tfOptions];
  }

  ngOnInit(): void {
    this.componentSubs.add(
      this.selectionControl.controls['discipline'].valueChanges.subscribe(
        (value) => {
          this.onDisciplineSelected(value || "");
        }
      ))

    this.componentSubs.add(
      this.selectionControl.valueChanges.pipe(
        filter(() => this.selectionControl.dirty),
        filter(() => this.isQueryValid())
      ).subscribe((value) => {
        this.setChosenQuery();
      }))

    this.componentSubs.add(
      this.route.queryParams.subscribe(params => {
          if (params.hasOwnProperty('method') &&
            this.methodsOptions.includes(params['method'])) {
            this.selectionControl.patchValue({method: params['method']});
          }
          if (params.hasOwnProperty('discipline') &&
            this.disciplineOptions.includes(params['discipline'])) {
            this.selectionControl.patchValue({discipline: params['discipline']});
            this.updateTFoptions();
          }
          if (params.hasOwnProperty('tf') &&
            this.tfOptions.includes(params['tf'])) {
            this.selectionControl.patchValue({tf: params['tf']});
          }
        }
      ));
  }

  ngOnDestroy(): void {
    this.componentSubs.unsubscribe();
  }

  getFullNameOfSuperDiscipline(value: any) {
    return getFullNameOfSuperDiscipline(value);
  }

  getFullNameOfSubDiscipline(value: any) {
    return getFullNameOfSubDiscipline(value);
  }

  getFullNameOfTF(value: any) {
    return getFullNameOfTF(value);
  }

  getSelectionTitle(): string {
    let fragments = Object.values(this.selectionControl.value)
    if (fragments.some(x => !x)) {
      return "Select a TF and a discipline"
    }
    return "Show submits for";
  }

  getSelectionDescription(): string {
    let fragments = Object.values(this.selectionControl.value).filter(n => n);
    return fragments.join(' - ');
  }

  getSelectionFullDescription(): string {
    let fragments = [
      getFullNameOfSuperDiscipline(this.selectionControl.value.discipline as typeof superDisciplines[number]),
      getFullNameOfSubDiscipline(this.selectionControl.value.method as typeof subDisciplines[number]),
      getFullNameOfTF(this.selectionControl.value.tf as typeof allTFs[number])
    ].filter(n => n);
    if (fragments.length == 0) {
      fragments.push('Nothing selected')
    }
    return fragments.join('; ');
  }

  updateTFoptions(byMethod: string = this.selectionControl.value.discipline || "") {
    this.tfOptions = this.disciplinesTFmap.get(byMethod as typeof superDisciplines[number]) || [];
  }

  onDisciplineSelected(value: string) {
    this.updateTFoptions(value);
  }

  isDisciplineSelected() {
    return this.disciplineOptions.includes(this.selectionControl.value.discipline as typeof superDisciplines[number]);
  }

  isQueryValid() {
    return this.selectionControl.valid;
  }

  // clearSelections() {
  //   this.selectionControl.reset();
  // }

  setChosenQuery() {
    let queryParams: Params = {...this.selectionControl.value}

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: queryParams,
        queryParamsHandling: 'merge'
      }
    )
  }
}
