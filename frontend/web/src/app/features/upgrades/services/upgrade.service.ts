import { Injectable } from '@angular/core';
import {
  CountryClient,
  DetailsClient,
} from '../../../shared/clients';
import { Observable } from 'rxjs';
import { CountryUpgrade } from '../country-upgrade';
import { map } from 'rxjs/operators';
import { UpgradeDetails } from '../upgrade-details';

@Injectable({
  providedIn: 'root',
})
export class UpgradeService {
  constructor(
    private countryClient: CountryClient,
    private detailsClient: DetailsClient
  ) {}

  getUpgradeDetails(): Observable<UpgradeDetails[]> {
    return this.detailsClient.getAllUpgradeDetails().pipe(
      map((upgradeDetailsDTOArray) => {
        return upgradeDetailsDTOArray.map((upgradeDetailsDTO) => ({
          id: upgradeDetailsDTO.upgradeTypeID,
          name: upgradeDetailsDTO.name!,
          description: upgradeDetailsDTO.effect!,
          imageSrc: '../../../../../assets/upgrades/iszaptraktor.png',
        }));
      })
    );
  }

  getCountryUpgrades(): Observable<CountryUpgrade[]> {
    return this.countryClient.getCountryUpgrades().pipe(
      map((upgradeDTOArrray) => {
        return upgradeDTOArrray.map((upgradeDTO) => ({
          id: upgradeDTO.upgradeTypeID,
          roundsLeft: upgradeDTO.progress
        }));
      })
    );
  }

  buyUpgrade(id: number) {
    //TODO
  }
}
