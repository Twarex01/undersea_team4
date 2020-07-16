import { Injectable } from '@angular/core';
import { CountryClient } from '../../shared/clients';
import { CountryBuilding } from '../status-bar/building';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CountryUnit } from '../status-bar/unit';
import { CountryResource } from '../status-bar/resource';

@Injectable({
  providedIn: 'root'
})
export class PlayerInfoService {

  constructor(private countryClient: CountryClient) { }

  getCountryBuildings(): Observable<CountryBuilding[]> {
    return this.countryClient.getCountryBuildings().pipe(
      map((buildingsDTOarray) => {
        return buildingsDTOarray.map((buildingsDTO)=> ({
          id: buildingsDTO.buildingTypeID,
          progress: buildingsDTO.progress,
          count: buildingsDTO.count
        }));
      })
    );
  }

  getCountryUnits(): Observable<CountryUnit[]> {
    return this.countryClient.getCountryUnits().pipe(
      map((untiDTOarray) => {
        return untiDTOarray.map((unitDTO)=> ({
          id: unitDTO.unitTypeID,
          count: unitDTO.count
        }));
      })
    );
  }

  getCountryResources(): Observable<CountryResource[]> {
    return this.countryClient.getCountryResources().pipe(
      map((resourceDTOarray) => {
        return resourceDTOarray.map((resourceDTO)=> ({
          id: resourceDTO.resourceTypeID,
          count: resourceDTO.amount,
          output: resourceDTO.production
        }));
      })
    );
  }


  getPlayerName(): string {
    return localStorage.getItem("playerName") ?? '';
  }

}
