import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { FullReport } from '../../models/full-report';

@Component({
  selector: 'app-reports.page',
  templateUrl: './reports.page.component.html',
  styleUrls: ['./reports.page.component.css']
})
export class ReportsPageComponent implements OnInit {

  countryId: number = 0;
  prevRound: number = 0;
  report: FullReport;

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.reportService.getCountryId().subscribe((cid) => {
      this.countryId = cid;
      this.reportService.getReports(this.countryId).subscribe((report) => this.report = report);
    });
    this.reportService.getPrevoiusRound().subscribe((round) => this.prevRound = round);
  }

}
