import { Component, OnInit } from '@angular/core';
import { PlayerInfoService } from '../services/player-info.service';
import { CountryBuilding } from './building';
import { CountryUnit } from './unit';
import { CountryResource } from './resource';


@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.css']
})
export class StatusBarComponent implements OnInit {

  buildings: CountryBuilding[] =
    new Array(
      {
        id: 0,
        progress: 0,
        count: 2
      },
      {
        id: 1,
        progress: 1,
        count: 1
      }
    );

  units: CountryUnit[] = new Array(
    {
      id: 0,
      count: 5
    },
    {
      id: 1,
      count: 7
    },
    {
      id: 2,
      count: 8
    }
  );

  resources: CountryResource[] = new Array(
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
  );

  constructor(private playerInfo: PlayerInfoService) { }

  ngOnInit(): void {
    this.playerInfo.getCountryBuildings().subscribe(builidngs => this.buildings = builidngs);
    this.playerInfo.getCountryResources().subscribe(resources => this.resources = resources);
    this.playerInfo.getCountryUnits().subscribe(units => this.units = units);
  }

}
