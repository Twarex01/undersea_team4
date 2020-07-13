import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpgradesRoutingModule } from './upgrades-routing.module';
import { UpgradesPageComponent } from './pages/upgrades.page/upgrades.page.component';
import { SharedModule } from '../../shared/shared.module';
import { UpgradeCardItemComponent } from './components/upgrade-card-item/upgrade-card-item.component';


@NgModule({
  declarations: [UpgradesPageComponent, UpgradeCardItemComponent],
  imports: [
    CommonModule,
    UpgradesRoutingModule,
    SharedModule
  ]
})
export class UpgradesModule { }
