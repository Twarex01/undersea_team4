import { Component, OnInit } from '@angular/core';
import { PlayerInfoService } from '../services/player-info.service';
import { CountryResourcesDTO, UnitDTO, ResourceDTO, BuildingDTO } from '../../shared/clients';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.css']
})
export class StatusBarComponent implements OnInit {

  resources: CountryResourcesDTO = new CountryResourcesDTO({
    army: new Array<UnitDTO>(
      new UnitDTO({
      id: 0,
      name: "lézercápa",
      count: 5
      }),
      new UnitDTO({
        id: 1,
        name: "rohamfóka",
        count: 7
      }),
      new UnitDTO({
        id: 2,
        name: "csatacsikó",
        count: 8
      })
    ),
    products: new Array<ResourceDTO>(
      new ResourceDTO({
        id: 0,
        count: 230,
        output: 20
      }),
      new ResourceDTO({
        id: 1,
        count: 320,
        output: 30
      })
    ),
    population: 500,
    armyCapacity: 300,
    buildings: new Array<BuildingDTO>(
      new BuildingDTO({
        id: 0,
        name: "Zátonyvár",
        progress: 0,
        count: 2
      }),
      new BuildingDTO({
        id: 1,
        name: "Áramlásirányító",
        progress: 1,
        count: 1
      })
    )
  });

  constructor(private playerInfo: PlayerInfoService) { }

  ngOnInit(): void {
    this.playerInfo.getResources().subscribe(resources => {
      this.resources = resources;
    })
  }

}
