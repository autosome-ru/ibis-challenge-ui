import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TeamSubmitsHomeComponent} from "./team-submits-home/team-submits-home.component";

const routes: Routes = [
  {
    path: '',
    component: TeamSubmitsHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamSubmitsRoutingModule {
}
