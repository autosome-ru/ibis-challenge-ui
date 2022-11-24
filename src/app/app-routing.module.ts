import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('src/app/modules/pages/landing-page/landing.module').then(
      mod => mod.LandingModule
    )
  },
  {
    canLoad: [AuthGuard],
    path: 'profile',
    loadChildren: () => import('src/app/modules/pages/profile-page/profile.module').then(
      mod => mod.ProfileModule
    )
  },
  {
    path: 'callback',
    loadChildren: () => import('src/app/modules/pages/github-login-callback-page/callback.module').then(
        mod => mod.CallbackModule
    )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {
}
