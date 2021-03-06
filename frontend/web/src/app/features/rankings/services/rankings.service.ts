import { Injectable } from '@angular/core';
import { PlayersClient} from '../../../shared/clients';
import { RankingsPlayer } from '../models/player';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RankingsService {

  constructor(private playersClient: PlayersClient) { }

  getPlayerList(): Observable<RankingsPlayer[]>{
    return this.playersClient.playerList().pipe( 
      map((rankDTOArray => {
        return rankDTOArray.map((rankDTO => ({id: rankDTO.countryID, name: rankDTO.name!, score: rankDTO.score})))
      })) 
    );
}

}
