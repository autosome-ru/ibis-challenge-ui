import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState, teamProfileSelector, userProfileSelector} from "../../../store";
import {GithubAuthService} from "../../../services/github-auth.service";
import {filter, mergeMap, Subscription, tap} from "rxjs";
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

  public User$ = this.store.pipe(select(userProfileSelector));
  public Team$ = this.store.pipe(select(teamProfileSelector));
  public addingNewTeam: boolean = false;
  public teamEditing: boolean = true;
  public teamQuestions: QuestionBase<string>[] = [];
  public memberQuestions: QuestionBase<string>[][] = [];
  public teamForm!: FormGroup;
  public user!: UserProfileModel | null;
  public team!: TeamProfileModel | null;
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
    order: 2,
    placeholder: 'Paris'
  }];

  constructor(private readonly store: Store<AppState>,
              private readonly authService: GithubAuthService,
              private readonly teamService: TeamLoadingService,
              private readonly questionService: QuestionService,
              private readonly qcs: QuestionControlService) {
    this.teamService.loadTeams();
    this.TeamSubscription = this.User$.pipe(
      tap(x => this.user = x as UserProfileModel),
      filter(x => x !== undefined),
      filter(x => x !== null),
      mergeMap(() => this.Team$.pipe(
          filter(x => x !== undefined),
          filter(x => x !== null)
        )
      )).subscribe(team => {

      // this.team = {
      //   name: "Awesome Team",
      //   email: "example@gmail.com",
      //   members: [{
      //     name: "Alexander S. Pushkin",
      //     affiliation: "Institute of Awesome Technology",
      //     city: "Paris",
      //     country: "France",
      //     member_idx: 0
      //   }]
      // }

      console.log(team);

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

      this.team = {...team!};
      if (!this.team.members) {
        this.team.members = [{name: this.user!.name, affiliation: "", country: "", city: "", member_idx: 0}]
      }

      // this.team = {
      //   name: "Awesome Team",
      //   email: "example@gmail.com",
      //   members: [{
      //     name: "Alexander S. Pushkin",
      //     affiliation: "Institute of Awesome Technology",
      //     city: "Paris",
      //     country: "France",
      //     member_idx: 0
      //   }]
      // }



      this.teamForm = this.qcs.toFormGroup(this.teamQuestions);



      for (let i = 0; i < this.team.members.length; i++) {
        let currentMemberQuestions = [
          {
            ...this.memberQuestionsTemplate[0],
            value: this.team.members[i].name
          }, {
            ...this.memberQuestionsTemplate[1],
            value: this.team.members[i].affiliation
          }, {
            ...this.memberQuestionsTemplate[2],
            value: this.team.members[i].country
          }, {
            ...this.memberQuestionsTemplate[3],
            value: this.team.members[i].city
          },
        ]
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
    this.authService.logoutGithub()
  }

  onAddNewTeamPressed() {
    this.addingNewTeam = true;
    this.teamEditingOn();
  }

  onSaveTeamChangesPressed() {
    if (!this.isFormValid()) {
      return
    }
    console.log({team: this.teamForm.value, members: Array.from(this.memberForms, form => form.value)})
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

    //this.teamService.sendTeams(this.team!);
  }

  onEditTeamPressed() {
    this.toggleTeamEditing();
  }

  onAddNewTeamMemberPressed() {
    let last_idx = this.team!.members.length;
    this.team?.members.push({
      name: "",
      affiliation: "",
      country: "",
      city: "",
      member_idx: last_idx
    });
    this.memberQuestions.push(this.questionService.getQuestions(this.memberQuestionsTemplate));
    this.memberForms.push(this.qcs.toFormGroup(this.memberQuestions[last_idx]))

  }

  ngOnDestroy(): void {
    this.TeamSubscription.unsubscribe();
  }

  userDropped(event: CdkDragDrop<TeamMemberModel[]>) {
    console.log("userDropped")
    moveItemInArray(
      this.team!.members,
      event.previousIndex,
      event.currentIndex
    )
    moveItemInArray(
      this.memberForms,
      event.previousIndex,
      event.currentIndex
    )
    this.team!.members[event.previousIndex].member_idx = event.previousIndex;
    this.team!.members[event.currentIndex].member_idx = event.currentIndex;
  }

  isFormValid() {
    return [this.teamForm.valid, ...Array.from(this.memberForms, form => form.valid)].every(val => val);
  }

  onRemoveMemberButtonPressed(memberIdx: number) {
    if (memberIdx == 0) return;
    this.memberForms.splice(memberIdx, 1);
    this.team!.members.splice(memberIdx, 1);
    for (let i = 0; i < this.team!.members.length; i++) {
      this.team!.members[i].member_idx = i;
    }
  }
}
