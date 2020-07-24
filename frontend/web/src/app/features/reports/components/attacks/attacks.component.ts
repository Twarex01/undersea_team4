import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BattleReport } from '../../../../shared/clients';
import { BattleReportModel } from '../../models/battle-report-model';

@Component({
  selector: 'app-attacks',
  templateUrl: './attacks.component.html',
  styleUrls: ['./attacks.component.css']
})
export class AttacksComponent implements OnInit {

  _prevRound: number = 1;
  @Input() attackReports: BattleReportModel[] = [];
  @Input() prevRound: number = 1;
  @Output() roundChanged = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }
}
