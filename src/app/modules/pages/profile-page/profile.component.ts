import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState, teamProfileSelector, userProfileSelector} from "../../../store";
import {GithubAuthService} from "../../../services/github-auth.service";
import {filter, map, mergeMap, Subscription, tap} from "rxjs";
import {TeamLoadingService} from "../../../services/team-loading.service";
import {TeamMemberModel, TeamProfileModel} from "../../../models/team.model";
import {UserProfileModel} from "../../../models/user.model";
import {QuestionService} from "../../../services/question.service";
import {QuestionBase} from "../../../models/question.model";
import {QuestionControlService} from "../../../services/question-control.service";
import {FormGroup} from "@angular/forms";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'ibis-profile-page',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit, OnDestroy {

  public User$ = this.store.pipe(select(userProfileSelector),
    filter(x => x !== undefined),
    filter(x => x !== null),
    map(x => x.data));
  public Team$ = this.store.pipe(select(teamProfileSelector),
    filter(x => x !== undefined),
    filter(x => x !== null),
    map(x => x.data));
  public addingNewTeam: boolean = false;
  public teamEditing: boolean = false;
  public teamQuestions: QuestionBase<string>[] = [];
  public memberQuestions: QuestionBase<string>[][] = [];
  public teamForm!: FormGroup;
  public user!: UserProfileModel | null;
  public team!: TeamProfileModel;
  public memberForms: FormGroup[] = [];
  public membersMax: number = 10;
  private TeamSubscription!: Subscription;
  private memberQuestionsTemplate: Array<any> = [{
    key: 'fullName',
    label: "Member's real full name",
    required: true,
    pattern: {pattern: "[a-zA-Z. ]*", errorMsg: "latin letters, spaces and dots"},
    order: 1,
    placeholder: 'Alexander S. Pushkin'
  }, {
    key: 'affiliation',
    label: "Member's affiliation",
    required: true,
    pattern: {pattern: "[a-zA-Z. ]*", errorMsg: "latin letters, spaces and dots"},
    order: 2,
    placeholder: 'Institute of Awesome Technology'
  }, {
    key: 'country',
    label: "Member's country",
    required: true,
    pattern: {pattern: "[a-zA-Z. ]*", errorMsg: "latin letters, spaces and dots"},
    order: 3,
    placeholder: 'France'
  }, {
    key: 'city',
    label: "Member's city",
    required: true,
    pattern: {pattern: "[a-zA-Z. ]*", errorMsg: "latin letters, spaces and dots"},
    order: 4,
    placeholder: 'Paris'
  }];
  private offset: number = 1;

  constructor(private readonly store: Store<AppState>,
              private readonly authService: GithubAuthService,
              private readonly teamService: TeamLoadingService,
              private readonly questionService: QuestionService,
              private readonly qcs: QuestionControlService) {
    //this.teamService.loadTeams();
    this.TeamSubscription = this.User$.pipe(
      tap(x => this.user = x as UserProfileModel),
      mergeMap(() => this.Team$
      )).subscribe(team => {
      this.team = {name: "", email: "", members: []}
      this.memberForms = [];

      this.teamQuestions = this.questionService.getQuestions([{
        key: 'teamName',
        label: 'Name of the team',
        required: true,
        pattern: {pattern: "[a-zA-Z. ]*", errorMsg: "latin letters, spaces and dots"},
        order: 1,
        placeholder: 'Awesome Team',
        value: team!.name
      }, {
        key: 'contactEmail',
        label: 'Contact e-mail of the team',
        required: true,
        emailValid: true,
        order: 2,
        type: "email",
        placeholder: 'example@gmail.com',
        value: team!.email
      }]);

      // this.team = {...team!};
      // this.team.members = Array.from([...team!.members], (x) => {
      //   return {...x}
      // });
      // this.team = team!;
      this.team = JSON.parse(JSON.stringify(team));


      this.teamForm = this.qcs.toFormGroup(this.teamQuestions);

      for (let i = 0; i < this.team.members.length; i++) {
        let currentMemberQuestions = this.getMemberQuestions(
          this.team.members[i].name,
          this.team.members[i].affiliation,
          this.team.members[i].country,
          this.team.members[i].city
        );
        this.memberQuestions[i] = this.questionService.getQuestions(currentMemberQuestions);
        this.memberForms.push(this.qcs.toFormGroup(this.memberQuestions[i]))
      }
    });
  }

  toggleTeamEditing(): void {
    this.teamEditing = !this.teamEditing;
  }

  teamEditingOn(): void {
    this.teamEditing = true;
  }

  teamEditingOff(): void {
    this.teamEditing = false;
  }

  ngOnInit(): void {
  }

  onSignOutPressed() {
    //this.authService.logoutGithub()
  }

  onSaveTeamChangesPressed() {
    if (!this.isFormValid()) {
      return
    }
    this.team!.name = this.teamForm.value.teamName;
    this.team!.email = this.teamForm.value.contactEmail;
    let memberValues = Array.from(this.memberForms, form => form.value);
    this.team!.members = [];
    for (let i = 0; i < memberValues.length; i++) {
      this.team!.members[i] = {
        name: memberValues[i].fullName,
        affiliation: memberValues[i].affiliation,
        country: memberValues[i].country,
        city: memberValues[i].city,
        member_idx: i
      }
    }
    this.toggleTeamEditing();

    this.teamService.sendTeams(this.team!);
  }

  onEditTeamPressed() {
    this.toggleTeamEditing();
  }

  getMemberQuestions(name = "", affiliation = "", country = "", city = "") {
    return [{
      ...this.memberQuestionsTemplate[0],
      value: name
    }, {
      ...this.memberQuestionsTemplate[1],
      value: affiliation
    }, {
      ...this.memberQuestionsTemplate[2],
      value: country
    }, {
      ...this.memberQuestionsTemplate[3],
      value: city
    },]
  }

  onAddFirstTeamMemberPressed() {
    let last_idx = this.team!.members.length;
    this.team!.members.push({
      name: this.user!.name,
      affiliation: "",
      country: "",
      city: "",
      member_idx: last_idx
    });
    let currentMemberQuestions = this.getMemberQuestions(this.user!.name);
    this.memberQuestions.push(this.questionService.getQuestions(currentMemberQuestions));
    this.memberForms.push(this.qcs.toFormGroup(this.memberQuestions[last_idx]))
    this.teamEditingOn();
  }

  onAddNewTeamMemberPressed(name = "", affiliation = "", country = "", city = "") {
    let last_idx = this.team!.members.length;
    this.team!.members.push({
      name: name,
      affiliation: affiliation,
      country: country,
      city: city,
      member_idx: last_idx
    });
    let currentMemberQuestions = this.getMemberQuestions(name, affiliation, country, city);
    this.memberQuestions.push(this.questionService.getQuestions(currentMemberQuestions));
    this.memberForms.push(this.qcs.toFormGroup(this.memberQuestions[last_idx]))

  }

  ngOnDestroy(): void {
    this.TeamSubscription.unsubscribe();
  }

  userDropped(event: CdkDragDrop<TeamMemberModel[]>) {
    moveItemInArray(
      this.team!.members,
      event.previousIndex + this.offset,
      event.currentIndex + this.offset
    )
    moveItemInArray(
      this.memberForms,
      event.previousIndex + this.offset,
      event.currentIndex + this.offset
    )
    this.team!.members[event.previousIndex + this.offset].member_idx = event.previousIndex + this.offset;
    this.team!.members[event.currentIndex + this.offset].member_idx = event.currentIndex + this.offset;
  }

  isFormValid() {
    return [this.teamForm.valid, ...Array.from(this.memberForms, form => form.valid)].every(val => val);
  }

  onRemoveMemberButtonPressed(memberIdx: number) {
    if (memberIdx == 0) return;
    this.memberQuestions.splice(memberIdx, 1);
    this.memberForms.splice(memberIdx, 1);
    this.team!.members.splice(memberIdx, 1);
    for (let i = 0; i < this.team!.members.length; i++) {
      this.team!.members[i].member_idx = i;
    }
  }

  teamDoesNotExist() {
    return !(!!this.team && !!this.team!.members && this.team!.members.length > 0);
  }

  membersExist() {
    return (!!this.team && !!this.team!.members && this.team!.members.length > 1)
  }
}
