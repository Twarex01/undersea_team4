import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  constructor() { }

  private hubConnection: signalR.HubConnection;

  public startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder().withUrl("https://localhost:5001/roundhub").build();
    this.hubConnection.start();
  }

  public addChangeRoundListener() {
    this.hubConnection.on("RefreshInfo", () => {
      window.location.reload();
    })
  }

}
