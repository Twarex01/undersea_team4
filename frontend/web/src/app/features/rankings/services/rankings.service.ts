import { Injectable } from '@angular/core';
import { PlayersClient, PlayerDTO } from '../../../shared/clients';

@Injectable({
  providedIn: 'root'
})
export class RankingsService {

  constructor(private playersClient: PlayersClient) { }

  getPlayerList (){
    return this.playersClient.playerList();
  }

}
