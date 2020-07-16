import { Injectable } from '@angular/core';
import { BattleClient } from '../../../shared/clients';

@Injectable({
  providedIn: 'root'
})
export class AttackService {

  constructor(private battleClient: BattleClient) { }

  getPlayerList(){
      //TODO
  }

  attack() {
    //TODO
    //this.battleClient.attack();
  }

}
