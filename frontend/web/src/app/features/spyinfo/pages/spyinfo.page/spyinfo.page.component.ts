import { Component, OnInit } from '@angular/core';
import { Spyinfo } from '../../models/spyinfo';
import { StatusNotificationService } from '../../../../core/services/status-notification.service';
import { SpyiinfoService } from '../../services/spyiinfo.service';

@Component({
  selector: 'app-spyinfo.page',
  templateUrl: './spyinfo.page.component.html',
  styleUrls: ['./spyinfo.page.component.css']
})
export class SpyinfoPageComponent implements OnInit {

  spyinfos: Spyinfo[] = [];

  constructor(private statusNotificationService: StatusNotificationService, private spyinfoService: SpyiinfoService) { }

  ngOnInit(): void {
    this.getSpyinfoData();
    this.statusNotificationService.notifications.subscribe(() => this.getSpyinfoData());
  }

  getSpyinfoData(): void {
    this.spyinfoService.getCountrySpyinfo().subscribe((spyinfos) => {
      this.spyinfos = spyinfos;
    })
  }

}
