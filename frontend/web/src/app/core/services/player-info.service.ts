import { Injectable } from '@angular/core';
import { CountryClient } from '../../shared/clients';

@Injectable({
  providedIn: 'root'
})
export class PlayerInfoService {

  constructor(private client: CountryClient) { }

  getResources() {
    //TODO
    //return this.client.getCountryResources();
  }

  getPlayerName(): string {
    return localStorage.getItem("playerName") ?? '';
  }

}
