import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IbisListComponent} from './ibis-list.component';
import {IbisListItemComponent} from './ibis-list-item/ibis-list-item.component';
import {MatBadgeModule} from "@angular/material/badge";


@NgModule({
    declarations: [
        IbisListComponent,
        IbisListItemComponent
    ],
    exports: [
        IbisListComponent,
        IbisListItemComponent
    ],
  imports: [
    CommonModule,
    MatBadgeModule
  ]
})
export class IbisListModule { }
