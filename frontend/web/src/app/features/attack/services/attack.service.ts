import { Injectable } from '@angular/core';
import { PlayersClient, CountryClient, DetailsClient, BattleClient, UnitDTO, BattleDTO } from '../../../shared/clients';
import { map } from 'rxjs/operators';
import { Player } from '../models/player';
import { Observable } from 'rxjs';
import { CountryUnit } from '../models/country-unit';
import { UnitDetails } from '../models/unit-details';
import { Battle } from '../models/battle';

@Injectable({
  providedIn: 'root'
})
export class AttackService {

  constructor(private playersClient: PlayersClient, private countryClient: CountryClient, private detailsClient: DetailsClient, private battleClient: BattleClient) { }

  getPlayerList(): Observable<Player[]>{
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

  getUnitDetails(): Observable<UnitDetails[]>{
    return this.detailsClient.getAllUnitDetails().pipe(
      map((unitDetailsDTOArray) => {
        return unitDetailsDTOArray.map((unitDetailsDTO) => ({id: unitDetailsDTO.unitTypeID, name: unitDetailsDTO.name!, imageSrc: "../../../../assets/icons/shark.svg"}))
      })
    );
  }

  attack(battle: Battle) {
    return this.battleClient.attack(
      new BattleDTO(({
        idDef: battle.defenderId,
        army: battle.army.map((cu) => new UnitDTO(({unitTypeID: cu.id, count: cu.count})))
      }))
    );
  }

}
