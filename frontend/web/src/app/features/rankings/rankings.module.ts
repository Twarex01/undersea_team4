import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RankingsRoutingModule } from './rankings-routing.module';
import { RankingsPageComponent } from './pages/rankings.page/rankings.page.component';


@NgModule({
  declarations: [RankingsPageComponent],
  imports: [
    CommonModule,
    RankingsRoutingModule
  ]
})
export class RankingsModule { }
