import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BattlesRoutingModule } from './battles-routing.module';
import { BattlesPageComponent } from './pages/battles.page/battles.page.component';
import { SharedModule } from '../../shared/shared.module';
import { CountryClient, BattleClient } from '../../shared/clients';


@NgModule({
  declarations: [BattlesPageComponent],
  imports: [
    CommonModule,
    BattlesRoutingModule,
    SharedModule
  ]
})
export class BattlesModule { }
