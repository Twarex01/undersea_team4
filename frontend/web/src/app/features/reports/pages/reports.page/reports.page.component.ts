import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { FullReport } from '../../models/full-report';
import { forkJoin } from 'rxjs';
import { StatusNotificationService } from '../../../../core/services/status-notification.service';

@Component({
  selector: 'app-reports.page',
  templateUrl: './reports.page.component.html',
  styleUrls: ['./reports.page.component.css']
})
export class ReportsPageComponent implements OnInit {

  countryId: number = 0;
  prevRound: number = 1;
  report: FullReport;

  constructor(private reportService: ReportService, private notificationService: StatusNotificationService) { }

  ngOnInit(): void {
    this.getAllData(this.prevRound);
    this.notificationService.notifications.subscribe(() => this.prevRound += 1);
  }

  getAllData(round: number) {
    forkJoin(
      this.reportService.getCountryId(),
      this.reportService.getPrevoiusRound()
    ).subscribe(([cid, prevRound]) => {
      this.countryId = cid;
      this.prevRound = prevRound;
      this.getReportsData(round);
    });
  }

  private getReportsData(round: number) {
    this.reportService.getReports(this.countryId, round).subscribe((report) => this.report = report);
  }

  onRoundChanged(round: number) {
    this.getReportsData(round);
  }

}
