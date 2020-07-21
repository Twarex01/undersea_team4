import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { StatusNotificationService } from './status-notification.service';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  constructor(private notiService: StatusNotificationService) { }

  private hubConnection: signalR.HubConnection;

  public startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder().withUrl("https://localhost:5001/roundhub").build();
    this.hubConnection.start();
  }

  public addChangeRoundListener() {
    this.hubConnection.on("RefreshInfo", () => {
      this.notiService.updateStatus(true);
    })
  }

}
