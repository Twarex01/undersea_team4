import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Spyinfo } from '../models/spyinfo';
import { BattleClient } from '../../../shared/clients';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpyiinfoService {

  constructor(private battleClient: BattleClient) { }

  getCountrySpyinfo(): Observable<Spyinfo[]> {
    //TODO
    return of([]);
  }
}
