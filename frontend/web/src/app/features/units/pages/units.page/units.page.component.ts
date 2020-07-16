import { Component, OnInit } from '@angular/core';
import { UnitService } from '../../services/unit.service';
import { UnitToBuy } from '../../models/unitToBuy';
import { Unit } from '../../models/unit';

@Component({
  selector: 'app-units.page',
  templateUrl: './units.page.component.html',
  styleUrls: ['./units.page.component.css']
})
export class UnitsPageComponent implements OnInit {

  units: Unit[] = new Array<Unit>(
    {id: 0, imageSrc: "../../../../../assets/icons/shark.svg", name: "Lézercápa", count: 0, attack: 5, defense: 5, pricePerRound: 1, supply: 1, price: 200, numToBuy: 0},
    {id: 1, imageSrc: "../../../../../assets/icons/shark.svg", name: "Lézercápa", count: 0, attack: 5, defense: 5, pricePerRound: 1, supply: 1, price: 200, numToBuy: 0},
    {id: 2, imageSrc: "../../../../../assets/icons/shark.svg", name: "Lézercápa", count: 0, attack: 5, defense: 5, pricePerRound: 1, supply: 1, price: 200, numToBuy: 0}
  );

  constructor(private unitService: UnitService) { }

  ngOnInit(): void {
    this.unitService.getCountryUnits();
  }

  buyUnits() {
    const unitsToBuy: UnitToBuy[] = this.units.map((unit) => ({id: unit.id, count: unit.numToBuy}));
    this.unitService.buyUnits(unitsToBuy);
  }

}
