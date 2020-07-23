import { Component, OnInit } from '@angular/core';
import { BattleReportModel } from '../../models/battle-report-model';
import { ExplorationReport } from '../../models/exploration-report';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-reports.page',
  templateUrl: './reports.page.component.html',
  styleUrls: ['./reports.page.component.css']
})
export class ReportsPageComponent implements OnInit {

  battleReports: BattleReportModel[] = [];
  explorationReports: ExplorationReport[] = [];

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
  }

}
