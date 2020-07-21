import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../services/signal-r.service';
import { PlayerInfoService } from '../services/player-info.service';
import { forkJoin } from 'rxjs';
import { StatusNotificationService } from '../services/status-notification.service';

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

  constructor(private signalRService: SignalRService, private playerInfoService: PlayerInfoService, private statusNotificationService: StatusNotificationService) { }

  ngOnInit(): void {
    this.getData();
    this.statusNotificationService.notifications.subscribe(() => this.getData());
    this.signalRService.startConnection();
    this.signalRService.addChangeRoundListener();
  }

  getData() {
    forkJoin(
      this.playerInfoService.getCountryBuildings(),
      this.playerInfoService.getCountryUpgrades(),
      this.playerInfoService.getUpgradeDetails(),
      this.playerInfoService.getBuildingDetails()
    ).subscribe(([countryBuildings, countryUpgrades, upgradeDetails, buildingDetails]) => {
      const zatonyId = buildingDetails.find((bd) => bd.name === "Zátonyvár")?.id;
      const aramlasId = buildingDetails.find((bd) => bd.name === "Áramlásirányító")?.id
      const sonarId = upgradeDetails.find((ud) => ud.name === "Szonár ágyú")?.id;

      const zatony = countryBuildings.find((cb) => cb.id === zatonyId);
      const aramlas = countryBuildings.find((cb) => cb.id === aramlasId);
      const sonar = countryUpgrades.find((cb) => cb.id === sonarId);

      if(zatony)
        this.zatonyImg = zatony?.count > 0 ? zatony?.imgSrc : undefined;

      if(aramlas)
        this.aramlasImg = aramlas?.count > 0 ? "../../../assets/background-buildings/aramlasiranyito.png" : undefined;

      if(sonar)
        this.sonarImg = sonar.roundsLeft == 0 ? sonar.imgSrc : undefined;

    });
  }

}
