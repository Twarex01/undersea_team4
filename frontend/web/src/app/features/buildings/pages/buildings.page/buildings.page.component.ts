import { Component, OnInit } from '@angular/core';
import { BuildingsService } from '../../services/buildings.service';
import { forkJoin } from 'rxjs';
import { Building } from '../../models/building';
import { StatusNotificationService } from '../../../../core/services/status-notification.service';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.page.component.html',
  styleUrls: ['./buildings.page.component.css']
})
export class BuildingsPageComponent implements OnInit {

  buildings: Building[] = [];

  selectedIndex: number = -1;

  constructor(private buildingsService: BuildingsService, private statusNotificationService: StatusNotificationService) { }

  ngOnInit(): void {
    forkJoin(
      this.buildingsService.getCountryBuildings(),
      this.buildingsService.getBuildingsData()
    ).subscribe(([countryBuildings, buildingDetails]) => {
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
          progress: countryBuilding.progress
        })
      });
    })
  }

  selectBuilding(index: number) {
    if(!this.canBeSelected(index))  return;
    if (this.selectedIndex !== -1)
      this.buildings[this.selectedIndex].isSelected = false;
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
      this.buildings[this.selectedIndex].progress = 1;
      this.selectedIndex = -1;
    });
  }
}
