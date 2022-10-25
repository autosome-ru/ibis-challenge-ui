import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IbisCardComponent} from './ibis-card.component';
import {IbisCardTitleComponent} from './ibis-card-title/ibis-card-title.component';
import {IbisCardContentComponent} from './ibis-card-content/ibis-card-content.component';
import {IbisCardFooterComponent} from './ibis-card-footer/ibis-card-footer.component';


@NgModule({
  declarations: [
    IbisCardComponent,
    IbisCardTitleComponent,
    IbisCardContentComponent,
    IbisCardFooterComponent
  ],
  exports: [
    IbisCardComponent,
    IbisCardTitleComponent,
    IbisCardContentComponent,
    IbisCardFooterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class IbisCardModule { }
