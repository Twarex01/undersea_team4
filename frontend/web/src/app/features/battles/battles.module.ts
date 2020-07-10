import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BattlesRoutingModule } from './battles-routing.module';
import { BattlesPageComponent } from './pages/battles.page/battles.page.component';


@NgModule({
  declarations: [BattlesPageComponent],
  imports: [
    CommonModule,
    BattlesRoutingModule
  ]
})
export class BattlesModule { }
