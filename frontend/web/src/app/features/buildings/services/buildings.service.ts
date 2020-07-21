import { Injectable } from '@angular/core';
import { CountryClient, DetailsClient } from '../../../shared/clients';
import { Observable, Subject } from 'rxjs';
import { CountryBuilding } from '../models/country-building';
import { map } from 'rxjs/operators';
import { BuildingDetails } from '../models/building-details';

@Injectable({
  providedIn: 'root'
})
export class BuildingsService {

  constructor(private countryClient: CountryClient, private detailsClient: DetailsClient) { }

  getCountryBuildings(): Observable<CountryBuilding[]> {
    return this.countryClient.getCountryBuildings().pipe(
      map((buildingDTOArray) => {
        return buildingDTOArray.map((buildingDTO) => ({
          id: buildingDTO.buildingTypeID,
          count: buildingDTO.count,
          progress: buildingDTO.progress
        }))
      })
    );
  }

  getBuildingsData(): Observable<BuildingDetails[]>{
    return this.detailsClient.getAllBuildingDetails().pipe(
      map((buildingDetailsArrayDTO) => {
        return buildingDetailsArrayDTO.map((buildingDetailsDTO) => ({
          id: buildingDetailsDTO.buildingTypeID,
          name: buildingDetailsDTO.name!,
          imageSrc: "../../../../../assets/buildings/zatonyvar.png",
          description: buildingDetailsDTO.effect!,
          price: buildingDetailsDTO.price,
          priceType: buildingDetailsDTO.priceTypeName!,
          buildTime: buildingDetailsDTO.buildTime
        }))
      })
    )
  }

  buyBuilding(buildingId: number){
    return this.countryClient.buyBuilding(buildingId);
  }

}
