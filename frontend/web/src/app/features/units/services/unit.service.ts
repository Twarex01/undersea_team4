import { Injectable } from '@angular/core';
import { CountryClient, DetailsClient, UnitDTO } from '../../../shared/clients';
import { CountryUnit } from '../country-unit';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UnitDetail } from '../units-detail';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  units: UnitDTO[] = [];
  
  constructor(private countryClient: CountryClient, private detailsClient: DetailsClient) { }

  getCountryUnits(): Observable<CountryUnit[]> {
    return this.countryClient.getCountryUnits().pipe(
      map((unitDTOArray) => {
        return unitDTOArray.map((unitDTO) => ({ id: unitDTO.unitTypeID, count: unitDTO.unitCount }))
      })
    );
  }

  getUnitDetails(): Observable<UnitDetail[]> {
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
          imgSrc: unitDetailsDTO?.imageURL ?? ""
        }))
      })
    );
  }

  buyUnits(unitsToBuy: any) {
    return this.countryClient.buyUnits(unitsToBuy);
  }

}
