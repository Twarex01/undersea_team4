import { Component, OnInit } from '@angular/core';
import { UnitService } from '../../services/unit.service';
import { UnitToBuy } from '../../models/unitToBuy';
import { Unit } from '../../models/unit';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-units.page',
  templateUrl: './units.page.component.html',
  styleUrls: ['./units.page.component.css']
})
export class UnitsPageComponent implements OnInit {

  units: Unit[] = [];

  constructor(private unitService: UnitService) { }

  ngOnInit(): void {
    forkJoin(
      this.unitService.getCountryUnits(),
      this.unitService.getUnitDetails()
    ).subscribe(([countryUnits, unitDetails]) => {
      unitDetails.forEach((unitDetail) => {
        const unit = countryUnits.find(countryUnit => countryUnit.id == unitDetail.id);
        this.units.push({
          id: unitDetail.id,
          imageSrc: unitDetail.imgSrc,
          name: unitDetail.name!,
          count: unit?.count ?? 0,
          attack: unitDetail.atk,
          defense: unitDetail.def,
          pricePerRound: unitDetail.pay,
          supply: unitDetail.consumption,
          price: unitDetail.price,
          numToBuy: 0
        })
      })
    });

  }

  buyUnits() {
    const unitsToBuy: UnitToBuy[] = this.units.map((unit) => ({ id: unit.id, count: unit.numToBuy }));
    this.unitService.buyUnits(unitsToBuy);
  }

  isReadyToAttack(): boolean {
    for (let i = 0; i < this.units.length; i++) {
      if (this.units[i].numToBuy > 0) return true;
    }
    return false;
  }

}
