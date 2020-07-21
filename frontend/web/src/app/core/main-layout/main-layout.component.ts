import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../services/signal-r.service';
import { PlayerInfoService } from '../services/player-info.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  hasSonarCannon: boolean = false;

  aramlasImg: string | undefined;
  zatonyImg: string | undefined;
  sonarImg: string | undefined;

  constructor(private signalRService: SignalRService, private playerInfoService: PlayerInfoService) { }

  ngOnInit(): void {
    forkJoin(
      this.playerInfoService.getCountryBuildings(),
      this.playerInfoService.getCountryUpgrades(),
      this.playerInfoService.getUpgradeDetails(),
      this.playerInfoService.getBuildingDetails()
    ).subscribe(([countryBuildings, countryUpgrades, upgradeDetails, buildingDetails]) => {
      const zatonyId = buildingDetails.find((bd) => bd.name === "Zátonyvár")?.id;
      const aramlasId = buildingDetails.find((bd) => bd.name === "Áramlásirányító")?.id
      const sonarId = upgradeDetails.find((ud) => ud.name === "Szonár ágyú")?.id;

      this.zatonyImg = countryBuildings.find((cb) => cb.id === zatonyId)?.imgSrc;
      //this.aramlasImg = countryBuildings.find((cb) => cb.id === aramlasId)?.imgSrc
      this.aramlasImg = "../../../assets/background-buildings/aramlasiranyito.png";
      this.sonarImg = countryUpgrades.find((cb) => cb.id === sonarId)?.imgSrc;
    });
    this.signalRService.startConnection();
    this.signalRService.addChangeRoundListener();
  }

}
