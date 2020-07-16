import { Injectable } from '@angular/core';
import { BattleClient, PlayersClient } from '../../../shared/clients';
import { map } from 'rxjs/operators';
import { Player } from '../player';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttackService {

  constructor(private playersClient: PlayersClient) { }

  getPlayerList(): Observable<Player[]>{
      return this.playersClient.playerList().pipe( 
        map((rankDTOArray => {
          return rankDTOArray.map((rankDTO => ({id: rankDTO.countryID, name: rankDTO.name!, isSelected: false})))
        })) 
      );
  }

  attack() {
    //TODO
    //this.battleClient.attack();
  }

}
