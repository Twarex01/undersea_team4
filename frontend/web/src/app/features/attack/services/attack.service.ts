import { Injectable, Inject } from '@angular/core';
import {
  PlayersClient,
  CountryClient,
  DetailsClient,
  BattleClient,
  UnitDTO,
  BattleDTO,
  API_BASE_URL,
} from '../../../shared/clients';
import { map } from 'rxjs/operators';
import { AttackPlayer } from '../models/attack-player';
import { Observable } from 'rxjs';
import { CountryUnit } from '../models/country-unit';
import { AttackUnitDetails } from '../models/attack-unit-details';
import { AttackBattle } from '../models/attack-battle';

@Injectable({
  providedIn: 'root',
})
export class AttackService {

  constructor(
    private playersClient: PlayersClient,
    private countryClient: CountryClient,
    private detailsClient: DetailsClient,
    private battleClient: BattleClient,
    @Inject(API_BASE_URL) public baseUrl: string
  ) {}

  getPlayerList(): Observable<AttackPlayer[]> {
    return this.playersClient.playerList().pipe(
      map((rankDTOArray) => {
        return rankDTOArray.map((rankDTO) => ({
          id: rankDTO.countryID,
          name: rankDTO.name!,
          isSelected: false,
        }));
      })
    );
  }

  getCountryUnits(): Observable<CountryUnit[]> {
    return this.countryClient.getCountryUnits().pipe(
      map((unitDTOArray) => {
        return unitDTOArray.map((unitDTO) => ({
          id: unitDTO.unitTypeID,
          count: unitDTO.unitCount,
        }));
      })
    );
  }

  getCountryName(): Observable<string> {
    return this.countryClient.getCountryDeatils().pipe(
      map((countryDetailsDTO) => {
        return countryDetailsDTO.name!;
      })
    );
  }

  getUnitDetails(): Observable<AttackUnitDetails[]> {
    return this.detailsClient.getAllUnitDetails().pipe(
      map((unitDetailsDTOArray) => {
        return unitDetailsDTOArray.map((unitDetailsDTO) => ({
          id: unitDetailsDTO.unitTypeID,
          name: unitDetailsDTO.name!,
          imageSrc: this.baseUrl + unitDetailsDTO.imageURL!,
        }));
      })
    );
  }

  attack(battle: AttackBattle) {
    return this.battleClient.attack(
      new BattleDTO({
        idDef: battle.defenderId,
        army: battle.army.map(
          (cu) => new UnitDTO({ unitTypeID: cu.id, unitCount: cu.count })
        ),
      })
    );
  }
}
