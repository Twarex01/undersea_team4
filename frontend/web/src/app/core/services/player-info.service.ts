import { Injectable } from '@angular/core';
import { CountryClient } from '../../shared/clients';

@Injectable({
  providedIn: 'root'
})
export class PlayerInfoService {

  constructor(private client: CountryClient) { }

  getResources() {
    return this.client.getCountryResources(0);
  }

}
