import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TeamSubmitsRoutingModule} from './team-submits-routing.module';
import {TeamSubmitsHomeComponent} from './team-submits-home/team-submits-home.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatSelectModule} from "@angular/material/select";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatRadioModule} from "@angular/material/radio";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

//import {TableModule} from "../../shared/table-template/table.module";


@NgModule({
  declarations: [
    TeamSubmitsHomeComponent
  ],
  imports: [
    CommonModule,
    TeamSubmitsRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatExpansionModule,
    MatRadioModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class TeamSubmitsModule {
}
