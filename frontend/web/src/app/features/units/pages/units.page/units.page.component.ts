import { Component, OnInit } from '@angular/core';
import { UnitService } from '../../services/unit.service';
import { UnitToBuy } from '../../models/unitToBuy';
import { Unit } from '../../models/unit';
import { forkJoin } from 'rxjs';
import { PlayerInfoService } from '../../../../core/services/player-info.service';
import { CountryResource } from '../../models/resources';
import {Router} from '@angular/router';
import { StatusNotificationService } from '../../../../core/services/status-notification.service';

@Component({
  selector: 'app-units.page',
  templateUrl: './units.page.component.html',
  styleUrls: ['./units.page.component.css']
})
export class UnitsPageComponent implements OnInit {

  units: Unit[] = [];
  pearl: CountryResource | undefined;
  armyCapacity : number | undefined;

  constructor(private unitService: UnitService, private palyerInfoService: PlayerInfoService,private router: Router, private statusNotificationService: StatusNotificationService) { }

  ngOnInit(): void {
    forkJoin(
      this.unitService.getCountryUnits(),
      this.unitService.getUnitDetails(),
      this.palyerInfoService.getCountryResources(),
      this.palyerInfoService.getCountryInfo()

    ).subscribe(([countryUnits, unitDetails,resources, countryinfo]) => {
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
      });
      this.pearl = resources.find(resource => resource.id == 2);
      this.armyCapacity = countryinfo.armyCapacity;
    });

  }

  buyUnits() {
    const unitsToBuy: UnitToBuy[] = this.units.map((unit) => ({ id: unit.id, count: unit.numToBuy }));
    this.unitService.buyUnits(unitsToBuy).subscribe(() => this.statusNotificationService.updateStatus(true));
    this.router.navigateByUrl('/'); 
  }

  isReadyToAttack(): boolean {
    for (let i = 0; i < this.units.length; i++) {
      if (this.units[i].numToBuy > 0) return true;
    }
    return false;
  }

}
