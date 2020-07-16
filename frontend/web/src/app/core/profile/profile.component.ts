import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { PlayerInfoService } from '../services/player-info.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private accountService: AccountService, private playerInfoService: PlayerInfoService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogout() {
    this.accountService.logout();
    this.router.navigate(["/login"]);
  }

  getPlayerName(): string {
    return this.playerInfoService.getPlayerName();
  }

}
