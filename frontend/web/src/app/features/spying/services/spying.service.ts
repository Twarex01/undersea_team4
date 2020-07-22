import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AttackPlayer } from '../../attack/models/attack-player';
import { PlayersClient, CountryClient, DetailsClient, BattleClient } from '../../../shared/clients';
import { AttackUnitDetails } from '../../attack/models/attack-unit-details';
import { CountryUnit } from '../../attack/models/country-unit';

@Injectable({
  providedIn: 'root'
})
export class SpyingService {

  constructor(private playersClient: PlayersClient, private countryClient: CountryClient, private detailsClient: DetailsClient, private battleClient: BattleClient) { }

  getPlayerList(): Observable<AttackPlayer[]>{
      return this.playersClient.playerList().pipe(
        map((rankDTOArray => {
          return rankDTOArray.map((rankDTO => ({id: rankDTO.countryID, name: rankDTO.name!, isSelected: false})))
        })) 
      );
  }

  getCountryUnits(): Observable<CountryUnit[]>{
    return this.countryClient.getCountryUnits().pipe(
      map((unitDTOArray) => {
        return unitDTOArray.map((unitDTO) => ({id: unitDTO.unitTypeID, count: unitDTO.count}))
      })
    );
  }

  getCountryName(): Observable<string> {
    return this.countryClient.getCountryDeatils().pipe(
      map((countryDetailsDTO) => {
        return countryDetailsDTO.name!
      })
    )
  }

  getUnitDetails(): Observable<AttackUnitDetails[]>{
    return this.detailsClient.getAllUnitDetails().pipe(
      map((unitDetailsDTOArray) => {
        return unitDetailsDTOArray.map((unitDetailsDTO) => ({id: unitDetailsDTO.unitTypeID, name: unitDetailsDTO.name!, imageSrc: "../../../../assets/icons/shark.svg"}))
      })
    );
  }
}
