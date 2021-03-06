import { Component, OnInit, Inject } from '@angular/core';
import { SignalRService } from '../services/signal-r.service';
import { PlayerInfoService } from '../services/player-info.service';
import { forkJoin } from 'rxjs';
import { StatusNotificationService } from '../services/status-notification.service';
import { API_BASE_URL } from '../../shared/clients';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
})
export class MainLayoutComponent implements OnInit {
  hasSonarCannon: boolean = false;

  aramlasImg: string | undefined;
  zatonyImg: string | undefined;
  sonarImg: string | undefined;
  stoneMineImg: string | undefined;

  constructor(
    private signalRService: SignalRService,
    private playerInfoService: PlayerInfoService,
    private statusNotificationService: StatusNotificationService,
    @Inject(API_BASE_URL) public baseUrl: string
  ) {}

  ngOnInit(): void {
    this.getData();
    this.statusNotificationService.notifications.subscribe(() =>
      this.getData()
    );
    this.signalRService.startConnection();
    this.signalRService.addChangeRoundListener();
  }

  getData() {
    forkJoin(
      this.playerInfoService.getCountryBuildings(),
      this.playerInfoService.getCountryUpgrades(),
      this.playerInfoService.getUpgradeDetails(),
      this.playerInfoService.getBuildingDetails()
    ).subscribe(
      ([
        countryBuildings,
        countryUpgrades,
        upgradeDetails,
        buildingDetails,
      ]) => {
        const zatonyDetails = buildingDetails.find(
          (bd) => bd.name === 'Zátonyvár'
        );
        const aramlasDetails = buildingDetails.find(
          (bd) => bd.name === 'Áramlásirányító'
        );
        const sonarDetails = upgradeDetails.find(
          (ud) => ud.name === 'Szonár ágyú'
        );
        const stoneMineDetails = buildingDetails.find(
          (bd) => bd.name === 'Kőbánya'
        );

        const zatony = countryBuildings.find(
          (cb) => cb.id === zatonyDetails?.id
        );
        const aramlas = countryBuildings.find(
          (cb) => cb.id === aramlasDetails?.id
        );
        const sonar = countryUpgrades.find((cb) => cb.id === sonarDetails?.id);
        const stoneMine = countryBuildings.find(
          (cb) => cb.id === stoneMineDetails?.id
        );

        if (zatony)
          this.zatonyImg =
            zatony?.count > 0 ? zatonyDetails?.backgroundSrc : undefined;

        if (aramlas)
          this.aramlasImg =
            aramlas?.count > 0 ? aramlasDetails?.backgroundSrc : undefined;

        if (stoneMine)
          this.stoneMineImg =
            stoneMine?.count > 0 ? stoneMineDetails?.backgroundSrc : undefined;

        if (sonar)
          this.sonarImg =
            sonar.roundsLeft == 0
              ? this.baseUrl + 'Assets/Upgrades/sonarcannon_background.png'
              : undefined;
      }
    );
  }
}
