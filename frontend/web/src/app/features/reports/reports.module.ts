import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsPageComponent } from './pages/reports.page/reports.page.component';
import { SharedModule } from '../../shared/shared.module';
import { ChooseRoundComponent } from './choose-round/choose-round.component';
import { AttacksComponent } from './components/attacks/attacks.component';
import { DefensesComponent } from './components/defenses/defenses.component';
import { ExplorationsComponent } from './components/explorations/explorations.component';


@NgModule({
  declarations: [ReportsPageComponent, ChooseRoundComponent, AttacksComponent, DefensesComponent, ExplorationsComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule
  ]
})
export class ReportsModule { }
