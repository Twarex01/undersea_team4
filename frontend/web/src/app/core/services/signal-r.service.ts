import { Injectable, Inject } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { StatusNotificationService } from './status-notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { API_BASE_URL } from '../../shared/clients';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  constructor(
    private snackBar: MatSnackBar,
    private notiService: StatusNotificationService,
    @Inject(API_BASE_URL) public baseUrl: string
  ) {}

  private hubConnection: signalR.HubConnection;

  public startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.baseUrl + '/roundhub')
      .build();
    this.hubConnection.start();
  }

  public addChangeRoundListener() {
    this.hubConnection.on('RefreshInfo', () => {
      this.snackBar.open('Körváltás történt!');
      this.notiService.updateStatus(true);
    });
  }
}
