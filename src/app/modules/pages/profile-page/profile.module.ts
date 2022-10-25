import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProfileRoutingModule} from './profile-routing.module';
import {ProfileComponent} from './profile.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {IbisCardModule} from "../../shared/ibis-card/ibis-card.module";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {IbisListModule} from "../../shared/ibis-list/ibis-list.module";
import {MatBadgeModule} from "@angular/material/badge";
import {DynamicFormModule} from "../../shared/dynamic-form/dynamic-form.module";
import {DynamicFormQuestionModule} from "../../shared/dynamic-form-question/dynamic-form-question.module";
import {ReactiveFormsModule} from "@angular/forms";
import {DragDropModule} from "@angular/cdk/drag-drop";


@NgModule({
  declarations: [
    ProfileComponent
  ],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        MatCardModule,
        MatButtonModule,
        IbisCardModule,
        MatProgressBarModule,
        MatIconModule,
        MatInputModule,
        IbisListModule,
        MatBadgeModule,
        DynamicFormModule,
        DynamicFormQuestionModule,
        ReactiveFormsModule,
        DragDropModule
    ]
})
export class ProfileModule { }
