import { Injectable } from '@angular/core';
import { CountryClient } from '../../../shared/clients';

@Injectable({
  providedIn: 'root'
})
export class BuildingsService {

  constructor(private countryClient: CountryClient) { }

  getBuildingsData(){
    //TODO
  }

  buyBuilding(id: number, buildingId: number){
    //TODO
  }

}
