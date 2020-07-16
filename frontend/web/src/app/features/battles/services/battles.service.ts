import { Injectable } from '@angular/core';
import { BattleClient } from '../../../shared/clients';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Battle } from '../models/battle';

@Injectable({
  providedIn: 'root'
})
export class BattlesService {

  constructor(private battleClient: BattleClient) { }

  getCountryBattles(): Observable<Battle[]> {
    return this.battleClient.getCountryBattles().pipe(
      map((battleArrayDTO) => {
        return battleArrayDTO.map((battleDTO) => ({
          defenderName: battleDTO.defenderName!,
          units: battleDTO.units!
        }))
      })
    );
  }

}
