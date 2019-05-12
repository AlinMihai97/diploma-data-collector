import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
  { path: 'calendar-view', loadChildren: './main/calendar-view/calendar-view.module#CalendarViewPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
