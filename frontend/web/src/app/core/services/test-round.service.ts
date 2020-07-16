import { Injectable } from '@angular/core';
import { RoundClient } from '../../shared/clients';

@Injectable({
  providedIn: 'root'
})
export class TestRoundService {

  constructor(private nextRoundService: RoundClient) { }

  testNextRound(){
    this.nextRoundService.nextRound().subscribe();
  }
}
