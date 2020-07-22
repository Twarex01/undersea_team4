import { Component, OnInit } from '@angular/core';
import { Spyinfo } from '../../models/spyinfo';
import { StatusNotificationService } from '../../../../core/services/status-notification.service';

@Component({
  selector: 'app-spyinfo.page',
  templateUrl: './spyinfo.page.component.html',
  styleUrls: ['./spyinfo.page.component.css']
})
export class SpyinfoPageComponent implements OnInit {

  spyinfos: Spyinfo[] = [];

  constructor(private statusNotificationService: StatusNotificationService) { }

  ngOnInit(): void {

  }

  getSpyinfoData(): void {
    
  }

}
