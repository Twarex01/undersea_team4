import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { not } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class StatusNotificationService {

  private notificationsSource = new BehaviorSubject<boolean>(true);
  notifications = this.notificationsSource.asObservable();

  constructor() { }

  updateStatus(notification: boolean) {
    this.notificationsSource.next(notification);
  }

}
