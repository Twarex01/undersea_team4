import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Spyinfo } from '../models/spyinfo';

@Injectable({
  providedIn: 'root'
})
export class SpyiinfoService {

  constructor() { }

  getCountrySpyinfo(): Observable<Spyinfo[]> {
    return of([]);
  }
}
