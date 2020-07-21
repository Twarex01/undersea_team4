import { Component, OnInit } from '@angular/core';
import { BuildingsService } from '../../services/buildings.service';
import { forkJoin } from 'rxjs';
import { Building } from '../../models/building';
import { StatusNotificationService } from '../../../../core/services/status-notification.service';
import { PlayerInfoService } from '../../../../core/services/player-info.service';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.page.component.html',
  styleUrls: ['./buildings.page.component.css']
})
export class BuildingsPageComponent implements OnInit {

  buildings: Building[] = [];
  countryPearl: number = 0;
  selectedIndex: number = -1;

  constructor(
    private buildingsService: BuildingsService,
    private statusNotificationService: StatusNotificationService,
    private palyerInfoService: PlayerInfoService
  ) { }

  ngOnInit(): void {
    forkJoin(
      this.buildingsService.getCountryBuildings(),
      this.buildingsService.getBuildingsData(),
      this.palyerInfoService.getCountryResources()
    ).subscribe(([countryBuildings, buildingDetails, resources]) => {
      buildingDetails.forEach((buildingDetail) => {
        const countryBuilding = countryBuildings.find(
          (cb) => cb.id == buildingDetail.id
        )!;
        this.buildings.push({
          id: buildingDetail.id,
          imgSrc: buildingDetail.imageSrc,
          name: buildingDetail.name,
          price: buildingDetail.price,
          priceType: buildingDetail.priceType,
          description: buildingDetail.description,
          count: countryBuilding?.count ?? 0,
          isSelected: false,
          progress: countryBuilding?.progress ?? -1,
          buildTime: buildingDetail.buildTime
        })
      });
      this.countryPearl = resources.find(resource => resource.id == 2)?.count ?? 0;
    })
  }

  selectBuilding(index: number) {
    if (!this.canBeSelected(index)) return;
    if (this.selectedIndex !== -1)
      this.buildings[this.selectedIndex].isSelected = false;
    if (this.countryPearl < this.buildings[index].price) return;
    this.selectedIndex = index;
    this.buildings[index].isSelected = true;
  }

  canBeSelected(index: number): boolean {
    return this.buildings.filter((building) => building.progress > 0).length === 0;
  }

  buySelectedBuilding() {
    this.buildingsService.buyBuilding(this.buildings[this.selectedIndex].id).subscribe(() => {
      this.statusNotificationService.updateStatus(true);
      this.buildings[this.selectedIndex].isSelected = false;
      this.buildings[this.selectedIndex].progress = this.buildings[this.selectedIndex].buildTime;
      this.selectedIndex = -1;
    });
  }
}
