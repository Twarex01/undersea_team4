import { Component, OnInit } from '@angular/core';
import { RankingsService } from '../../services/rankings.service';
import { Observable } from 'rxjs';
import { PlayerDTO } from '../../../../shared/clients';
import { Player } from '../../palyer';

@Component({
  selector: 'app-rankings.page',
  templateUrl: './rankings.page.component.html',
  styleUrls: ['./rankings.page.component.css']
})
export class RankingsPageComponent implements OnInit {

  players: Player[] = new Array<Player>(
    {name: "Jani", id: 0, score: 222},
    {name: "Jani2", id: 1, score: 122},
    {name: "Jani233", id: 1, score: 12}
    );

  constructor(private rankingsService: RankingsService) { }

  ngOnInit(): void {
  }

  getPlayers() {
    // this.rankingsService.getPlayerList().subscribe(list => this.players = list);
  }

}
