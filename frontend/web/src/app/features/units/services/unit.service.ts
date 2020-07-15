import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor() { }

  getCountryUnits() {
    //TODO
  }

  buyUnits(unitsToBuy: any) {
    console.log(unitsToBuy);
    //TODO
  }

}
