import { Injectable } from '@angular/core';
import { UpgradesClient, CountryClient, UpgradeDetailsDTO } from '../../../shared/clients';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpgradeService {

  constructor(private upgradesClient: UpgradesClient, private countryClient: CountryClient) { }

  getCountryUpgrades(): Observable<UpgradeDetailsDTO> {
    //TODO
    return;
  }

  buyUpgrade(id: number) {
    //TODO
  }

}
