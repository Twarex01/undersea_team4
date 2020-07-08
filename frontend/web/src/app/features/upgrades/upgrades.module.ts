import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpgradesRoutingModule } from './upgrades-routing.module';
import { UpgradesComponent } from './components/upgrades/upgrades.component';
import { UpgradesPageComponent } from './pages/upgrades.page/upgrades.page.component';


@NgModule({
  declarations: [UpgradesComponent, UpgradesPageComponent],
  imports: [
    CommonModule,
    UpgradesRoutingModule
  ]
})
export class UpgradesModule { }
