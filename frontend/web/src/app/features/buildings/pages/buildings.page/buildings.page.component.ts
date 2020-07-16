import { Component, OnInit } from '@angular/core';
import { BuildingsService } from '../../services/buildings.service';
import { Observable, forkJoin } from 'rxjs';
import { Building } from '../../building';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.page.component.html',
  styleUrls: ['./buildings.page.component.css']
})
export class BuildingsPageComponent implements OnInit {

  buildings: Building[] = new Array<Building>(
    { id: 1, imgSrc: "../../../../../assets/buildings/zatonyvar.png", name: "Zátonyvár", description: "50 ember-t ad a népességhez 200 krumplit termel körönként", price: 45, priceType: "Gyöngy", count: 1, isSelected: false },
    { id: 2, imgSrc: "../../../../../assets/buildings/aramlasiranyito.png", name: "Áramlásirányító", description: "200 egység nyújt szállást", price: 35, count: 1, priceType: "Gyöngy", isSelected: false }
  )

  selectedIndex: number = -1;

  constructor(private buildingsService: BuildingsService) { }

  ngOnInit(): void {
    forkJoin(
      this.buildingsService.getCountryBuildings(),
      this.buildingsService.getBuildingsData()
    ).subscribe(([countryBuildings, buildingDetails]) => {
      this.buildings = [];
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
          count: countryBuilding.count,
          isSelected: false
        })
      });
    })
  }

  selectBuilding(index: number) {
    if (this.selectedIndex !== -1)
      this.buildings[this.selectedIndex].isSelected = false;
    this.selectedIndex = index;
    this.buildings[index].isSelected = true;
    console.log("Building" + this.selectedIndex + " selected");
  }

  buySelectedBuilding() {
    this.buildingsService.buyBuilding(this.buildings[this.selectedIndex].id).subscribe();
  }
}
