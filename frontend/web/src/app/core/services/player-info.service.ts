import { Injectable } from '@angular/core';
import { CountryClient, DetailsClient, RoundClient } from '../../shared/clients';
import { CountryBuilding } from '../status-bar/country-building';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CountryUnit } from '../status-bar/country-unit';
import { CountryResource } from '../status-bar/country-resource';
import { UnitDetails } from '../status-bar/unit-detail';
import { BuildingDetails } from '../status-bar/building-detail';
import { CountryRound } from '../status-bar/country-round';
import { CountryDetail } from '../../features/units/models/country-detail';

@Injectable({
  providedIn: 'root'
})
export class PlayerInfoService {

  constructor(
    private countryClient: CountryClient,
    private detailsClient: DetailsClient,
    private roundService: RoundClient
  ) { }

  getCountryBuildings(): Observable<CountryBuilding[]> {
    return this.countryClient.getCountryBuildings().pipe(
      map((buildingsDTOarray) => {
        return buildingsDTOarray.map((buildingsDTO) => ({
          id: buildingsDTO.buildingTypeID,
          progress: buildingsDTO.progress,
          count: buildingsDTO.count,
          imgSrc: ""
        }));
      })
    );
  }

  getCountryUnits(): Observable<CountryUnit[]> {
    return this.countryClient.getCountryUnits().pipe(
      map((untiDTOarray) => {
        return untiDTOarray.map((unitDTO) => ({
          id: unitDTO.unitTypeID,
          count: unitDTO.count,
          imgSrc: ""
        }));
      })
    );
  }

  getUnitDetails(): Observable<UnitDetails[]> {
    return this.detailsClient.getAllUnitDetails().pipe(
      map((unitDetailsDTOarray) => {
        return unitDetailsDTOarray.map((unitDetailsDTO) => ({
          id: unitDetailsDTO.unitTypeID,
          imgSrc: "../../../assets/icons/shark.svg"
        }));
      })
    );
  }

  getBuildingDetails(): Observable<BuildingDetails[]> {
    return this.detailsClient.getAllBuildingDetails().pipe(
      map((buildingDetailsDTOarray) => {
        return buildingDetailsDTOarray.map((buildingDetailsDTO) => ({
          id: buildingDetailsDTO.buildingTypeID,
          imgSrc: "../../../assets/icons/coral.svg"
        }));
      })
    );
  }


  getCountryResources(): Observable<CountryResource[]> {
    return this.countryClient.getCountryResources().pipe(
      map((resourceDTOarray) => {
        return resourceDTOarray.map((resourceDTO) => ({
          id: resourceDTO.resourceTypeID,
          count: resourceDTO.amount,
          output: resourceDTO.production,
          imgSrc: ""
        }));
      })
    );
  }

  getCountryRound(): Observable<CountryRound> {
    return this.roundService.getCountryRound().pipe(
      map((countryRoundDTO)=>({
        rank: countryRoundDTO.rank,
        round: countryRoundDTO.round
      }))
    );
  }

  getCountryInfo(): Observable<CountryDetail>{
    return this.countryClient.getCountryDeatils().pipe(
      map((countryDetail) => ({
        armyCapacity: countryDetail.armyCapacity
      }))
    );
  }


  getPlayerName(): string {
    return localStorage.getItem("playerName") ?? '';
  }

}
