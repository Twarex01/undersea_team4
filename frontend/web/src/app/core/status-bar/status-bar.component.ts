import { Component, OnInit } from '@angular/core';
import { PlayerInfoService } from '../services/player-info.service';
import { CountryBuilding } from './country-building';
import { CountryUnit } from './country-unit';
import { CountryResource } from './country-resource';
import { forkJoin } from 'rxjs';
import { CountryRound } from './country-round';
import { StatusNotificationService } from '../services/status-notification.service';


@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.css']
})
export class StatusBarComponent implements OnInit {

  buildings: CountryBuilding[];

  units: CountryUnit[];

  resources: CountryResource[];

  countryRound: CountryRound;

  constructor(private playerInfo: PlayerInfoService,  private statusNotificationService: StatusNotificationService) { }

  ngOnInit(): void {
    this.getStatusBarData();
    this.statusNotificationService.notifications.subscribe(() => this.getStatusBarData());
  }

  getStatusBarData() {
    forkJoin(
      this.playerInfo.getCountryBuildings(),
      this.playerInfo.getCountryResources(),
      this.playerInfo.getCountryUnits(),
      this.playerInfo.getUnitDetails(),
      this.playerInfo.getBuildingDetails(),
      this.playerInfo.getCountryRound()
    ).subscribe(([buildings, resources, units, unitDetails, buildingDetails, countryRound]) => {
      this.buildings = buildings;
      buildingDetails.forEach((buildingDetail) => {
        const building = this.buildings.find(building => building.id === buildingDetail.id);
        if (building) {
          building.imgSrc = buildingDetail.imgSrc;
        }
        else {
          this.buildings.push({
            id: buildingDetail.id,
            progress: 0,
            count: 0,
            imgSrc: buildingDetail.imgSrc
          })
        }
      })
      this.units = units;
      unitDetails.forEach((unitDetail) => {
        const unit = this.units.find(unit => unit.id === unitDetail.id);
        if (unit) {
          unit.imgSrc = unitDetail.imgSrc;
        }
        else {
          this.units.push({
            id: unitDetail.id,
            count: 0,
            imgSrc: unitDetail.imgSrc
          })
        }
      })
      this.countryRound = countryRound;
      this.resources = resources;
      //missing endpont:(
      resources.forEach((resource) => {
        if (resource.id == 1) { resource.imgSrc = "../../../assets/icons/coral.svg";}
        if (resource.id == 2) { resource.imgSrc = "../../../assets/icons/shell.svg";}
      })
    })
  }

}
