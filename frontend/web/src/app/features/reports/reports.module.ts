import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsPageComponent } from './pages/reports.page/reports.page.component';
import { SharedModule } from '../../shared/shared.module';
import { ChooseRoundComponent } from './choose-round/choose-round.component';


@NgModule({
  declarations: [ReportsPageComponent, ChooseRoundComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule
  ]
})
export class ReportsModule { }
