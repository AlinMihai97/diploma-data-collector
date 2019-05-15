import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CalendarListViewComponent } from './calendar-list-view/calendar-list-view.component';
import { CalendarListEntryComponent } from './calendar-list-entry/calendar-list-entry.component';

const routes: Routes = [
  {
    path: '',
    component: MainPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: [MainPage, CalendarListViewComponent, CalendarListEntryComponent]
})
export class MainSubroutingModule {}
