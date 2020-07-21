import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../services/signal-r.service';
import { PlayerInfoService } from '../services/player-info.service';
import { forkJoin } from 'rxjs';
import { CountryBuilding } from '../status-bar/country-building';
import { CountryUpgrade } from '../../features/upgrades/models/country-upgrade';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  buildings: CountryBuilding[] = [];
  upgrades: CountryUpgrade[] = [];

  constructor(private signalRService: SignalRService, private playerInfoService: PlayerInfoService) { }

  ngOnInit(): void {
    forkJoin(
      this.playerInfoService.getCountryBuildings(),
      this.playerInfoService.getCountryUpgrades(),
    ).subscribe(([countryBuildings, countryUpgrades]) => {
      this.buildings = countryBuildings;
      this.upgrades = countryUpgrades;
    });
    this.signalRService.startConnection();
    this.signalRService.addChangeRoundListener();
  }

}
