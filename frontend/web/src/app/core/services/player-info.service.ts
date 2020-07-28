import { Injectable, Inject } from '@angular/core';
import { CountryClient, DetailsClient, RoundClient, API_BASE_URL } from '../../shared/clients';
import { CountryBuilding } from '../status-bar/models/country-building';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CountryUnit } from '../status-bar/models/country-unit';
import { CountryResource } from '../status-bar/models/country-resource';
import { UnitDetails } from '../status-bar/unit-detail';
import { BuildingDetails } from '../status-bar/models/building-detail';
import { CountryRound } from '../status-bar/models/country-round';
import { CountryDetail } from '../../features/units/models/country-detail';
import { CountryUpgrade } from '../../features/upgrades/models/country-upgrade';
import { UpgradeDetails } from '../../features/upgrades/models/upgrade-details';

@Injectable({
  providedIn: 'root'
})
export class PlayerInfoService {

  constructor(
    private countryClient: CountryClient,
    private detailsClient: DetailsClient,
    private roundService: RoundClient,
    @Inject(API_BASE_URL) public baseUrl: string
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
          count: unitDTO.unitCount,
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
          imgSrc: this.baseUrl + unitDetailsDTO?.imageURL ?? ""
        }));
      })
    );
  }

  getBuildingDetails(): Observable<BuildingDetails[]> {
    return this.detailsClient.getAllBuildingDetails().pipe(
      map((buildingDetailsDTOarray) => {
        return buildingDetailsDTOarray.map((buildingDetailsDTO) => ({
          id: buildingDetailsDTO.buildingTypeID,
          name: buildingDetailsDTO.name!,
          imgSrc: this.baseUrl + buildingDetailsDTO?.iconURL ?? "",
          backgroundSrc: this.baseUrl + buildingDetailsDTO?.backgroundURL ?? "",
          iconSrc: this.baseUrl + buildingDetailsDTO?.imageURL ?? ""
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
          imgSrc: this.baseUrl + resourceDTO?.imageURL ?? "",
          name: resourceDTO.name!
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

  getUpgradeDetails(): Observable<UpgradeDetails[]> {
    return this.detailsClient.getAllUpgradeDetails().pipe(
      map((upgradeDetailsDTOArray) => {
        return upgradeDetailsDTOArray.map((upgradeDetailsDTO) => ({
          id: upgradeDetailsDTO.upgradeTypeID,
          name: upgradeDetailsDTO.name!,
          description: upgradeDetailsDTO.effect!,
          imageSrc: "",
        }));
      })
    );
  }

  getCountryUpgrades(): Observable<CountryUpgrade[]> {
    return this.countryClient.getCountryUpgrades().pipe(
      map((upgradeDTOArrray) => {
        return upgradeDTOArrray.map((upgradeDTO) => ({
          id: upgradeDTO.upgradeTypeID,
          roundsLeft: upgradeDTO.progress,
          imgSrc: ""
        }));
      })
    );
  }

  getPlayerName(): string {
    return localStorage.getItem("playerName") ?? '';
  }

}
