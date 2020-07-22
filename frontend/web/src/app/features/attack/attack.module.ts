import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttackRoutingModule } from './attack-routing.module';
import { AttackPageComponent } from './pages/attack.page/attack.page.component';
import { ChooseUnitComponent } from './components/choose-unit/choose-unit.component';
import { SharedModule } from '../../shared/shared.module';
import { AttackComponent } from './components/attack/attack.component';


@NgModule({
  declarations: [AttackPageComponent, ChooseUnitComponent, AttackComponent],
  imports: [
    CommonModule,
    AttackRoutingModule,
    SharedModule
  ]
})
export class AttackModule { }
