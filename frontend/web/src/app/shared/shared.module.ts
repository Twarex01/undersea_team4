import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttackModule } from '../features/attack/attack.module';
import { BattleModule } from '../features/battle/battle.module';

@NgModule({
  declarations: [],
  imports: [
    AttackModule,
    BattleModule
  ]
})
export class SharedModule { }