import { Component, OnInit } from '@angular/core';
import { RankingsService } from '../../services/rankings.service';
import { Observable } from 'rxjs';
import { RankingsPlayer } from '../../models/player';

@Component({
  selector: 'app-rankings.page',
  templateUrl: './rankings.page.component.html',
  styleUrls: ['./rankings.page.component.css']
})
export class RankingsPageComponent implements OnInit {

  searchInput: string = "";

  players: RankingsPlayer[] = [];

  constructor(private rankingsService: RankingsService) { }

  ngOnInit(): void {
    this.getPlayers() 
  }

  filterPlayerList() : RankingsPlayer[] {
    return this.players.filter((player) => player.name.toLowerCase().includes(this.searchInput.trim().toLowerCase()));
  }

  getPlayers() {
    this.rankingsService.getPlayerList().subscribe(list => this.players = list);
  }

}
