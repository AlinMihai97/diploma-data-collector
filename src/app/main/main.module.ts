import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MainSubroutingModule } from './main-subrouting.module'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainSubroutingModule
  ]
})
export class MainPageModule {}
