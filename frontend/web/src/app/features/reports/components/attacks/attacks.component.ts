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

  constructor() { }

  ngOnInit(): void {
  }

}
