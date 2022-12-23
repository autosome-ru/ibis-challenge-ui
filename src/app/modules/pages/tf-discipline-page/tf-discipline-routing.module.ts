import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TfDisciplineComponent} from "./tf-discipline-page/tf-discipline.component";
import {TfDisciplineHomeComponent} from "./tf-discipline-home/tf-discipline-home.component";

const routes: Routes = [
  {
    path: '',
    component: TfDisciplineHomeComponent
  },
  {
    path: ':discipline/:method/:tf',
    component: TfDisciplineComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TfDisciplineRoutingModule { }
