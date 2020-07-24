import { Component, OnInit } from '@angular/core';
import { UnitService } from '../../services/unit.service';
import { UnitToBuy } from '../../models/unitToBuy';
import { Unit } from '../../models/unit';
import { forkJoin } from 'rxjs';
import { PlayerInfoService } from '../../../../core/services/player-info.service';
import { CountryResource } from '../../models/resources';
import { Router } from '@angular/router';
import { StatusNotificationService } from '../../../../core/services/status-notification.service';
import { UnitBuyInfo } from '../../models/unit-buy-info';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-units.page',
  templateUrl: './units.page.component.html',
  styleUrls: ['./units.page.component.css']
})
export class UnitsPageComponent implements OnInit {

  units: Unit[] = [];

  unitBuyInfo: UnitBuyInfo = {
    pearl: 0,
    armyCapacity: 0,
    estimatedUnitsCount: 0,
    estimatedPearlCost: 0
  };


  constructor(
    private unitService: UnitService,
    private palyerInfoService: PlayerInfoService,
    private statusNotificationService: StatusNotificationService,
    private snackBar: MatSnackBar
  ) { }



  ngOnInit(): void {
    this.getArmyInfo();
    this.statusNotificationService.notifications.subscribe(() => this.getResources());
  }

  getResources() {
    this.palyerInfoService.getCountryResources().subscribe(res => {
      const countryResource = res.find(resource => resource.name == 'Gyöngy')
      this.unitBuyInfo.pearl = countryResource?.count ?? 0;
    });
  }

  getArmyInfo() {
    this.units = [];

    forkJoin(
      this.unitService.getCountryUnits(),
      this.unitService.getUnitDetails(),
      this.palyerInfoService.getCountryResources(),
      this.palyerInfoService.getCountryInfo()

    ).subscribe(([countryUnits, unitDetails, resources, countryinfo]) => {
      unitDetails.forEach((unitDetail) => {
        const unit = countryUnits.find(countryUnit => countryUnit.id == unitDetail.id);
        if (unit && this.unitBuyInfo) { this.unitBuyInfo.estimatedUnitsCount += unit.count }
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
      });

      if (this.unitBuyInfo) {
        const countryResource = resources.find(resource => resource.name == 'Gyöngy');
        this.unitBuyInfo.pearl = countryResource?.count ?? 0;
        this.unitBuyInfo.armyCapacity = countryinfo.armyCapacity;
      }
    });
  }

  buyUnits() {
    const unitsToBuy: UnitToBuy[] = this.units.map((unit) => ({ unitTypeID: unit.id, count: unit.numToBuy }));
    let onlyInteger = true;
    unitsToBuy.forEach(unit => {
      if (unit.count - Math.floor(unit.count) != 0) {
        onlyInteger = false;
        this.snackBar.open('Csak egész egységeket lehet venni!', '', { panelClass: "custom-snackbar-units" });
        return;
      }
    });
    if (!onlyInteger) return;
    this.unitService.buyUnits(unitsToBuy).subscribe(() => {
      this.snackBar.open("Sikeres vásárlás!", '', { panelClass: "custom-snackbar-units" });
      this.statusNotificationService.updateStatus(true);
      unitsToBuy.forEach((unit) => {
        const i = this.units.findIndex(u => u.id === unit.unitTypeID);
        this.units[i].count += unit.count;
        this.units[i].numToBuy = 0;
      });
      this.getResources();
      this.unitBuyInfo.estimatedPearlCost = 0;
    },
      (error) => this.snackBar.open(error.response));
  }

  isReadyToAttack(): boolean {
    for (let i = 0; i < this.units.length; i++) {
      if (this.units[i].numToBuy > 0) return true;
    }
    return false;
  }
}
