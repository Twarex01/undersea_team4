import { Component, OnInit } from '@angular/core';
import { BattlesService } from '../../services/battles.service';
import { Battle } from '../../models/battle';
import { StatusNotificationService } from '../../../../core/services/status-notification.service';
import { Spyinfo } from '../../../spyinfo/models/spyinfo';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-battles.page',
  templateUrl: './battles.page.component.html',
  styleUrls: ['./battles.page.component.css']
})
export class BattlesPageComponent implements OnInit {

  battles: Battle[] = [];
  spydetails: Battle[] = [];

  constructor(
    private battleService: BattlesService,
    private statusNotificationService: StatusNotificationService
  ) { }

  ngOnInit(): void {
    this.getBattlesData();
    this.statusNotificationService.notifications.subscribe(() => this.getBattlesData());
  }

  getBattlesData(): void {
    forkJoin(
      this.battleService.getCountryBattles(),
      this.battleService.getCountrySpiesDetails()
    ).subscribe(([countryBattles, spiesDetails]) => {
      this.battles = countryBattles;
      this.spydetails = spiesDetails;
    })
  }

}
