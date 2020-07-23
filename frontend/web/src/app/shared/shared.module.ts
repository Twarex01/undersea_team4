import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BasicCardComponent } from './basic-card/basic-card.component';
import { IconBoxComponent } from './icon-box/icon-box.component';
import { CountryClient, BattleClient, PlayersClient, DetailsClient } from './clients';
import { PlayerListComponent } from './player-list/player-list.component';
import { ChooseUnitComponent } from './choose-unit/choose-unit.component';
import { MatTabsModule } from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [BasicCardComponent, IconBoxComponent, PlayerListComponent, ChooseUnitComponent],
  imports: [CommonModule, FormsModule, MatTabsModule, MatExpansionModule],
  exports: [CommonModule, FormsModule, MatTabsModule, MatExpansionModule, BasicCardComponent, IconBoxComponent, PlayerListComponent, ChooseUnitComponent],
  providers: [CountryClient, BattleClient, PlayersClient, DetailsClient]
})
export class SharedModule { }