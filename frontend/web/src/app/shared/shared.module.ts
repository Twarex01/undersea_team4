import { NgModule } from '@angular/core';
import { AttackModule } from '../features/attack/attack.module';
import { BattlesModule } from '../features/battles/battles.module';
import { BuildingsModule } from '../features/buildings/buildings.module';
import { UnitsModule } from '../features/units/units.module';
import { UpgradesModule } from '../features/upgrades/upgrades.module';
import { RankingsModule } from '../features/rankings/rankings.module';

@NgModule({
  declarations: [],
  imports: [
    AttackModule,
    BattlesModule,
    BuildingsModule,
    UnitsModule,
    UpgradesModule,
    RankingsModule
  ]
})
export class SharedModule { }