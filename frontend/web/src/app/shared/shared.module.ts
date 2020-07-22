import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BasicCardComponent } from './basic-card/basic-card.component';
import { IconBoxComponent } from './icon-box/icon-box.component';
import { CountryClient, BattleClient, PlayersClient, DetailsClient } from './clients';
import { PlayerListComponent } from './player-list/player-list.component';
import { ChooseUnitComponent } from './choose-unit/choose-unit.component';

@NgModule({
  declarations: [BasicCardComponent, IconBoxComponent, PlayerListComponent, ChooseUnitComponent],
  imports: [CommonModule, FormsModule],
  exports: [CommonModule, BasicCardComponent, IconBoxComponent, PlayerListComponent, ChooseUnitComponent],
  providers: [CountryClient, BattleClient, PlayersClient, DetailsClient]
})
export class SharedModule { }