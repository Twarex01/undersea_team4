import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttackRoutingModule } from './attack-routing.module';
import { AttackPageComponent } from './pages/attack.page/attack.page.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { ChooseUnitComponent } from './components/choose-unit/choose-unit.component';
import { SharedModule } from '../../shared/shared.module';
import { AttackComponent } from './components/attack/attack.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AttackPageComponent, PlayerListComponent, ChooseUnitComponent, AttackComponent],
  imports: [
    CommonModule,
    AttackRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class AttackModule { }
