import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../services/signal-r.service';
import { PlayerInfoService } from '../services/player-info.service';
import { forkJoin } from 'rxjs';
import { CountryBuilding } from '../status-bar/country-building';
import { CountryUpgrade } from '../../features/upgrades/models/country-upgrade';
import { BackgroundUpgrade } from './models/background-upgrade';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  buildings: CountryBuilding[] = [];
  hasSonarCannon: boolean = false;
  sonar: BackgroundUpgrade | undefined;

  constructor(private signalRService: SignalRService, private playerInfoService: PlayerInfoService) { }

  ngOnInit(): void {
    forkJoin(
      this.playerInfoService.getCountryBuildings(),
      this.playerInfoService.getCountryUpgrades(),
      this.playerInfoService.getUpgradeDetails()
    ).subscribe(([countryBuildings, countryUpgrades, upgradeDetails]) => {
      this.buildings = countryBuildings;
      const sonarId = upgradeDetails.find((ud) => ud.name === "Szonár ágyú")?.id;
      const sonarImg = countryUpgrades.find((cb) => cb.id === sonarId)?.imgSrc;
      if(sonarId && sonarImg){
        this.sonar = {id: sonarId, imgSrc: sonarImg};
      }
    });
    this.signalRService.startConnection();
    this.signalRService.addChangeRoundListener();
  }

}
