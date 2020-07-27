import { Component, OnInit } from '@angular/core';
import { PlayerInfoService } from '../services/player-info.service';
import { CountryBuilding } from './models/country-building';
import { CountryUnit } from './models/country-unit';
import { CountryResource } from './models/country-resource';
import { forkJoin } from 'rxjs';
import { CountryRound } from './models/country-round';
import { StatusNotificationService } from '../services/status-notification.service';


@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.css']
})
export class StatusBarComponent implements OnInit {

  buildings: CountryBuilding[] = [];
  units: CountryUnit[] = [];
  resources: CountryResource[] = [];
  countryRound: CountryRound = {
    round: 0,
    rank: 0
  };

  constructor(private playerInfo: PlayerInfoService,  private statusNotificationService: StatusNotificationService) { }

  ngOnInit(): void {
    this.getStatusBarData();
    this.statusNotificationService.notifications.subscribe(() => this.getStatusBarData());
  }

  updateStatusBarData() {
    forkJoin(
      this.playerInfo.getCountryResources(),
      this.playerInfo.getCountryUnits(),
      this.playerInfo.getCountryRound()
    ).subscribe(([countryResources, countryUnits, countryRound]) => {
      countryUnits.forEach((cu) => {
        const unit = this.units.find((u) => u.id === cu.id)!;
        unit.count = cu.count;
      });
      countryResources.forEach((cr) => {
        const resource = this.resources.find((res) => res.id == cr.id)!;
        resource.count = cr.count;
        resource.output = cr.output;
      });
      this.countryRound = countryRound;
    });

    this.updateBuildings();
  }

  private updateBuildings() {
    this.buildings.forEach((b) => {
      if(b.progress > 0){
        b.progress -= 1;
        if(b.progress == 0)
          b.count = 0;
      }
    })
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
    })
  }

}
