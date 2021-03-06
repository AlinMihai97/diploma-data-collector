import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoadingScreenGuardGuard } from './guards/loading-screen-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'cal-details/:name', loadChildren: './cal-details/cal-details.module#CalDetailsPageModule' },
  { path: 'first-setup', 
    loadChildren: './first-setup/first-setup.module#FirstSetupPageModule'
  },
  { path: 'data-upload', loadChildren: './data-upload/data-upload.module#DataUploadPageModule' },
  { path: 'main', loadChildren: './main/main.module#MainPageModule' },
  { path: 'user-info', loadChildren: './user-info/user-info.module#UserInfoPageModule' },
  { path: 'event-view', loadChildren: './event-view/event-view.module#EventViewPageModule' },
  { path: 'verify-api', loadChildren: './verify-api/verify-api.module#VerifyApiPageModule', canActivate: [LoadingScreenGuardGuard] },
  { path: 'sync', loadChildren: './main/sync/sync.module#SyncPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
