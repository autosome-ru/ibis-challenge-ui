import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeComponent } from './code.component';
import {HIGHLIGHT_OPTIONS, HighlightModule} from "ngx-highlightjs";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    CodeComponent
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          python: () => import('highlight.js/lib/languages/python')
        }
        // ,
        // themePath: 'src/app/styles/code.scss' // Optional, and useful if you want to change the theme dynamically
      }
    }
  ],
  exports: [
    CodeComponent
  ],
  imports: [
    CommonModule,
    HighlightModule,
    MatIconModule
  ]
})
export class CodeModule { }
