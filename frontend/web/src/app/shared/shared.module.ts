import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicCardComponent } from './basic-card/basic-card.component';
import { IconBoxComponent } from './icon-box/icon-box.component';
import { CountryClient, BattleClient, PlayersClient, DetailsClient } from './clients';

@NgModule({
  declarations: [BasicCardComponent, IconBoxComponent],
  imports: [CommonModule],
  exports: [CommonModule, BasicCardComponent, IconBoxComponent],
  providers: [CountryClient, BattleClient, PlayersClient, DetailsClient]
})
export class SharedModule { }