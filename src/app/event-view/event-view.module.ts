import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EventViewPage } from './event-view.page';
import { ErrorEventComponent } from './error-event/error-event.component';

const routes: Routes = [
  {
    path: ':id',
    component: EventViewPage
  },
  {
    path: '**',
    component: ErrorEventComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EventViewPage, ErrorEventComponent]
})
export class EventViewPageModule {}
