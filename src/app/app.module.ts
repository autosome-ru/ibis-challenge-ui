import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {NavigationModule} from "./modules/shared/navigation/navigation.module";
import {CodeModule} from "./modules/shared/code/code.module";
import {HttpClientModule} from "@angular/common/http";
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {appReducers, UserEffects} from "./store";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


// import {appReducer} from "./store/reducer";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    NavigationModule,
    CodeModule,
    HttpClientModule,
    StoreModule.forRoot(appReducers, {}),
    EffectsModule.forRoot([UserEffects]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    MatProgressSpinnerModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
