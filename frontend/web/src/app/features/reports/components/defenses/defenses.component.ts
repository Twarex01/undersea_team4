import { Component, OnInit, Input } from '@angular/core';
import { BattleReportModel } from '../../models/battle-report-model';

@Component({
  selector: 'app-defenses',
  templateUrl: './defenses.component.html',
  styleUrls: ['./defenses.component.css']
})
export class DefensesComponent implements OnInit {

  @Input() defenseReports: BattleReportModel[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
