import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnitsRoutingModule } from './units-routing.module';
import { UnitsPageComponent } from './pages/units.page/units.page.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [UnitsPageComponent],
  imports: [
    CommonModule,
    UnitsRoutingModule,
    SharedModule
  ]
})
export class UnitsModule { }
