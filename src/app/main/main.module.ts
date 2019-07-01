import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MainSubroutingModule } from './main-subrouting.module'
import { SyncPageModule } from './sync/sync.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainSubroutingModule,
    SyncPageModule
  ]
})
export class MainPageModule { }
