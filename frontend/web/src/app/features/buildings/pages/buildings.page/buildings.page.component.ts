import { Component, OnInit } from '@angular/core';
import { BuildingsService } from '../../services/buildings.service';
import { forkJoin } from 'rxjs';
import { Building } from '../../models/building';
import { StatusNotificationService } from '../../../../core/services/status-notification.service';
import { PlayerInfoService } from '../../../../core/services/player-info.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Resource } from '../../models/resource';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.page.component.html',
  styleUrls: ['./buildings.page.component.css']
})
export class BuildingsPageComponent implements OnInit {

  buildings: Building[] = [];
  countryResources: Resource[] = [];
  selectedIndex: number = -1;
  imgBaseUrl: string = "https://localhost:5001/";

  constructor(
    private buildingsService: BuildingsService,
    private statusNotificationService: StatusNotificationService,
    private palyerInfoService: PlayerInfoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getBuildingData(); 
    this.statusNotificationService.notifications.subscribe(() => this.getBuildingData());   
  }

  getBuildingData(): void{
    forkJoin(
      this.buildingsService.getCountryBuildings(),
      this.buildingsService.getBuildingsData(),
      this.palyerInfoService.getCountryResources()
    ).subscribe(([countryBuildings, buildingDetails, resources]) => {
      this.buildings = [];
      buildingDetails.forEach((buildingDetail) => {
        const countryBuilding = countryBuildings.find(
          (cb) => cb.id == buildingDetail.id
        )!;
        this.buildings.push({
          id: buildingDetail.id,
          imgSrc: buildingDetail.imageSrc,
          name: buildingDetail.name,
          prices: buildingDetail.prices,
          description: buildingDetail.description,
          count: countryBuilding?.count ?? 0,
          isSelected: false,
          progress: countryBuilding?.progress ?? -1,
          buildTime: buildingDetail.buildTime
        })
      });
      
      this.countryResources = [];
      resources.forEach((resource) => {
        this.countryResources.push({
          id: resource.id,
          amount: resource.count,
          name: resource.name
        })
      })
    })
  }

  selectBuilding(index: number) {
    if (!this.canBeSelected(index)) return;
    if (this.selectedIndex !== -1)
      this.buildings[this.selectedIndex].isSelected = false;
    if (!this.hasEnoughResource) return;
    this.selectedIndex = index;
    this.buildings[index].isSelected = true;
  }

  hasEnoughResource(): boolean {
    const selectedBuilding = this.buildings[this.selectedIndex];
    for(let i = 0; i < selectedBuilding.prices.length; i++){
      const countryResource = this.countryResources.find((cr) => cr.name === selectedBuilding.prices[i].priceTypeName)!;
      if(countryResource?.amount < selectedBuilding.prices[i].price)  return false;
    }
    return true;
  }

  canBeSelected(index: number): boolean {
    return this.buildings.filter((building) => building.progress > 0).length === 0;
  }

  buySelectedBuilding() {
    if(!this.hasEnoughResource()){
      this.snackBar.open("Nincs elegendő nyersanyag!");
      return;
    }

    this.buildingsService.buyBuilding(this.buildings[this.selectedIndex].id).subscribe(() => {
      this.statusNotificationService.updateStatus(true);
      this.buildings[this.selectedIndex].isSelected = false;
      this.buildings[this.selectedIndex].progress = this.buildings[this.selectedIndex].buildTime;
      this.selectedIndex = -1;
    });
  }
}
