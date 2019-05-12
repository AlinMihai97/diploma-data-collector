import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CalendarViewPage } from './calendar-view.page';
import {CalendarListEntryComponent} from '../calendar-list-entry/calendar-list-entry.component'

const routes: Routes = [
  {
    path: '',
    component: CalendarViewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CalendarViewPage, CalendarListEntryComponent]
})
export class CalendarViewPageModule {}
