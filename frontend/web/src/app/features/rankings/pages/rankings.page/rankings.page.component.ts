import { Component, OnInit } from '@angular/core';
import { RankingsService } from '../../services/rankings.service';
import { Observable } from 'rxjs';
import { Player } from '../../palyer';

@Component({
  selector: 'app-rankings.page',
  templateUrl: './rankings.page.component.html',
  styleUrls: ['./rankings.page.component.css']
})
export class RankingsPageComponent implements OnInit {

  searchInput: string = "";

  players: Player[] = [];

  constructor(private rankingsService: RankingsService) { }

  ngOnInit(): void {
    this.getPlayers() 
  }

  filterPlayerList() : Player[] {
    return this.players.filter((player) => player.name.includes(this.searchInput.trim()));
  }

  getPlayers() {
    this.rankingsService.getPlayerList().subscribe(list => this.players = list);
  }

}
