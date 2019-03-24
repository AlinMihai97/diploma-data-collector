import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FirstSetupPage } from './first-setup.page';
import { CalendarSelectComponent } from './calendar-select/calendar-select.component'
import { EmailSelectComponent} from './email-select/email-select.component'
import { TimespanSelectComponent} from './timespan-select/timespan-select.component'

const routes: Routes = [
  {
    path: '',
    component: FirstSetupPage,
    children: [
      { path: '', redirectTo: 'calendar-select', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FirstSetupPage, CalendarSelectComponent, EmailSelectComponent, TimespanSelectComponent]
})
export class FirstSetupPageModule {}
