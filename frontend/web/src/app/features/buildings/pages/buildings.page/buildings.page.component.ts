import { Component, OnInit } from '@angular/core';
import { BuildingsService } from '../../services/buildings.service';
import { Observable } from 'rxjs';
import { Building } from '../../building';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.page.component.html',
  styleUrls: ['./buildings.page.component.css']
})
export class BuildingsPageComponent implements OnInit {

  buildings: Building[] = new Array<Building>(
    { id: 1, imgSrc: "../../../../../assets/buildings/zatonyvar.png", name: "Zátonyvár", description: "50 ember-t ad a népességhez 200 krumplit termel körönként", price: 45, progress: 1, count: 1, isSelected: false },
    { id: 2, imgSrc: "../../../../../assets/buildings/aramlasiranyito.png", name: "Áramlásirányító", description: "200 egység nyújt szállást", price: 35, progress: 0, count: 1, isSelected: false }
  )

  selectedIndex: number = -1;

  constructor(private buildingsService: BuildingsService,) { }

  ngOnInit(): void {

  }

  selectBuilding(index: number) {
    if (this.selectedIndex !== -1)
      this.buildings[this.selectedIndex].isSelected = false;
    this.selectedIndex = index;
    this.buildings[index].isSelected = true;
    console.log("Building" + this.selectedIndex + " selected");
  }

  buySelectedBuilding() {
    //TODO
    this.buildingsService.buyBuilding(1, this.buildings[this.selectedIndex].id);
  }

  getBuildings() {
    //TODO this.buildingsService.getBuildingsData().subscribe(buildings => { this.buildings = buildings });
  }
}
