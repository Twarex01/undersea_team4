import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpgradesRoutingModule } from './upgrades-routing.module';
import { UpgradesPageComponent } from './pages/upgrades.page/upgrades.page.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [UpgradesPageComponent],
  imports: [
    CommonModule,
    UpgradesRoutingModule,
    SharedModule
  ]
})
export class UpgradesModule { }
