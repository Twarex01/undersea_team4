import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BattleReportModel } from '../../models/battle-report-model';

@Component({
  selector: 'app-defenses',
  templateUrl: './defenses.component.html',
  styleUrls: ['./defenses.component.css']
})
export class DefensesComponent implements OnInit {

  @Input() defenseReports: BattleReportModel[] = [];
  @Input() prevRound: number = 0;
  @Output() roundChanged = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }
}
