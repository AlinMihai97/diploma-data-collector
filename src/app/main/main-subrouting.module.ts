import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CalendarViewPageModule } from './calendar-view/calendar-view.module';
import { CalendarViewPage } from './calendar-view/calendar-view.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
        {
            path: 'lala',
            component: CalendarViewPage
        }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarViewPageModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: [MainPage]
})
export class MainSubroutingModule {}
