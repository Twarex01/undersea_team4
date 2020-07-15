import { Injectable } from '@angular/core';
import { BuildingsClient, CountryClient } from '../../../shared/clients';

@Injectable({
  providedIn: 'root'
})
export class BuildingsService {

  constructor(private buildingsClient: BuildingsClient, private countryClient: CountryClient) { }

  getBuildingsData(){
    //TODO
  }

  buyBuilding(id: number, buildingId: number){
    //TODO
  }

}
