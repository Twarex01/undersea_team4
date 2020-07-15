import { Injectable } from '@angular/core';
import { UnitsClient } from '../../../shared/clients';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor(private unitsClient: UnitsClient) { }

  getCountryUnits() {
    //TODO
  }

  buyUnits(unitsToBuy: any) {
    console.log(unitsToBuy);
    //TODO
  }

}
