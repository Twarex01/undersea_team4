import { Injectable } from '@angular/core';
import { CountryClient, DetailsClient } from '../../../shared/clients';
import { CountryUnit } from '../country-unit';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UnitDetail } from '../units-detail';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor(private countryClient: CountryClient, private detailsClient: DetailsClient) { }

  getCountryUnits(): Observable<CountryUnit[]>{
    return this.countryClient.getCountryUnits().pipe(
      map((unitDTOArray) => {
        return unitDTOArray.map((unitDTO) => ({id: unitDTO.unitTypeID, count: unitDTO.count}))
      })
    );
  }

  getUnitDetails(): Observable<UnitDetail[]>{
    return this.detailsClient.getAllUnitDetails().pipe(
      map((unitDetailsDTOArray) => {
        return unitDetailsDTOArray.map((unitDetailsDTO) => ({
          id: unitDetailsDTO.unitTypeID,
          name: unitDetailsDTO.name,
          atk: unitDetailsDTO.atk,
          def: unitDetailsDTO.def,
          pay: unitDetailsDTO.salary,
          consumption: unitDetailsDTO.consumption,
          price: unitDetailsDTO.price,
          imgSrc: "../../../../assets/icons/shark.svg"
        }))
      })
    );
  }

  buyUnits(unitsToBuy: any) {
    this.countryClient.buyUnits(unitsToBuy);
    console.log(unitsToBuy);
    //TODO
  }

}
