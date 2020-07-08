import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttackRoutingModule } from './attack-routing.module';
import { AttackPageComponent } from './pages/attack.page/attack.page.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { ChooseUnitComponent } from './components/choose-unit/choose-unit.component';


@NgModule({
  declarations: [AttackPageComponent, PlayerListComponent, ChooseUnitComponent],
  imports: [
    CommonModule,
    AttackRoutingModule
  ]
})
export class AttackModule { }
