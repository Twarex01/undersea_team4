import { Component, OnInit } from '@angular/core';
import { RankingsService } from '../../services/rankings.service';
import { RankingsPlayer } from '../../models/player';
import { StatusNotificationService } from '../../../../core/services/status-notification.service';

@Component({
  selector: 'app-rankings.page',
  templateUrl: './rankings.page.component.html',
  styleUrls: ['./rankings.page.component.css']
})
export class RankingsPageComponent implements OnInit {

  searchInput: string = "";

  players: RankingsPlayer[] = [];

  constructor(
    private rankingsService: RankingsService,
    private statusNotificationService: StatusNotificationService
  ) { }

  ngOnInit(): void {
    this.getPlayers();
    this.statusNotificationService.notifications.subscribe(() => this.getPlayers());
  }

  filterPlayerList() : RankingsPlayer[] {
    return this.players.filter((player) => player.name.toLowerCase().includes(this.searchInput.trim().toLowerCase()));
  }

  getPlayers() {
    this.rankingsService.getPlayerList().subscribe(list => this.players = list);
  }

}
