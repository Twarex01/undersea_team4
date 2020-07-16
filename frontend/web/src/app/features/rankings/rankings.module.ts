import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RankingsRoutingModule } from './rankings-routing.module';
import { RankingsPageComponent } from './pages/rankings.page/rankings.page.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [RankingsPageComponent],
  imports: [
    CommonModule,
    RankingsRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class RankingsModule { }
