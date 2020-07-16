import { Component, OnInit } from '@angular/core';
import { PlayerInfoService } from '../services/player-info.service';
import { Resources } from './resources';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.css']
})
export class StatusBarComponent implements OnInit {

  resources: Resources = {
    army: new Array(
      {
      id: 0,
      name: "lézercápa",
      count: 5
      },
      {
        id: 1,
        name: "rohamfóka",
        count: 7
      },
      {
        id: 2,
        name: "csatacsikó",
        count: 8
      }
    ),
    products: new Array(
      {
        id: 0,
        count: 230,
        output: 20
      },
      {
        id: 1,
        count: 320,
        output: 30
      }
    ),
    population: 500,
    armyCapacity: 300,
    buildings: new Array(
      {
        id: 0,
        name: "Zátonyvár",
        progress: 0,
        count: 2
      },
      {
        id: 1,
        name: "Áramlásirányító",
        progress: 1,
        count: 1
      }
    )
  };

  constructor(private playerInfo: PlayerInfoService) { }

  ngOnInit(): void {
    this.playerInfo.getResources();
  }

}
