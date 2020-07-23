import { Component, OnInit } from '@angular/core';
import { BattleReport } from '../../models/battle-report';
import { Exploration } from '../../../spying/models/exploration';
import { ExplorationReport } from '../../models/exploration-report';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-reports.page',
  templateUrl: './reports.page.component.html',
  styleUrls: ['./reports.page.component.css']
})
export class ReportsPageComponent implements OnInit {

  battleReports: BattleReport[] = [];
  explorationReports: ExplorationReport[] = [];

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
  }

}
