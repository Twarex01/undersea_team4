import { Injectable } from '@angular/core';
import { CountryClient, UpgradeDetailsDTO } from '../../../shared/clients';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpgradeService {

  constructor(private countryClient: CountryClient) { }

  getCountryUpgrades(): Observable<UpgradeDetailsDTO> {
    //TODO
    return;
  }

  buyUpgrade(id: number) {
    //TODO
  }

}
