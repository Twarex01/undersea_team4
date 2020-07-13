import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnitsRoutingModule } from './units-routing.module';
import { UnitsPageComponent } from './pages/units.page/units.page.component';
import { SharedModule } from '../../shared/shared.module';
import { UnitCardItemComponent } from './components/unit-card-item/unit-card-item.component';


@NgModule({
  declarations: [UnitsPageComponent, UnitCardItemComponent],
  imports: [
    CommonModule,
    UnitsRoutingModule,
    SharedModule
  ]
})
export class UnitsModule { }
