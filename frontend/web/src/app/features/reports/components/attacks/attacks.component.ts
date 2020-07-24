import { Component, OnInit, Input } from '@angular/core';
import { BattleReport } from '../../../../shared/clients';
import { BattleReportModel } from '../../models/battle-report-model';

@Component({
  selector: 'app-attacks',
  templateUrl: './attacks.component.html',
  styleUrls: ['./attacks.component.css']
})
export class AttacksComponent implements OnInit {

  @Input() attackReports: BattleReportModel[] = [];
  @Input() prevRound: number = 0;

  chosenRound: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.chosenRound = this.prevRound;
  }

  getReports() {
    return this.attackReports.filter((ar) => ar.round === this.chosenRound);
  }

  onChosenRoundChanged(round: number){
    this.chosenRound = round;
  }

}
