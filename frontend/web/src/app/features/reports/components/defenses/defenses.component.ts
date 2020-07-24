import { Component, OnInit, Input } from '@angular/core';
import { BattleReportModel } from '../../models/battle-report-model';

@Component({
  selector: 'app-defenses',
  templateUrl: './defenses.component.html',
  styleUrls: ['./defenses.component.css']
})
export class DefensesComponent implements OnInit {

  @Input() defenseReports: BattleReportModel[] = [];
  @Input() prevRound: number = 0;

  chosenRound: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.chosenRound = this.prevRound;
  }

  getReports() {
    return this.defenseReports.filter((dr) => dr.round === this.chosenRound);
  }

  onChosenRoundChanged(round: number){
    this.chosenRound = round;
  }

}
