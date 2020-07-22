import { Component, OnInit } from '@angular/core';
import { AttackUnit } from '../../../attack/models/attack-unit';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AttackPlayer } from '../../../attack/models/attack-player';

@Component({
  selector: 'app-spying.page',
  templateUrl: './spying.page.component.html',
  styleUrls: ['./spying.page.component.css']
})
export class SpyingPageComponent implements OnInit {

  countryName: string = "";
  selectedPlayerId: number = -1;
  explorerUnits: AttackUnit[] = [];
  players: AttackPlayer[] = [];

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    //TODO
    this.explorerUnits.push({
      id: 5,
      name: "Felfedező",
      imageSrc: "../../../../../assets/icons/shark.svg",
      count: 4,
      countToAttack: 0
    })
  }

  onExplore() {
    //TODO
  }

  onSelectedPlayerChanged(id: number) {
    this.selectedPlayerId = id;
  }

  isReadyToSend(): boolean {
    return this.selectedPlayerId !== -1 && this.explorerUnits[0].countToAttack > 0;
  }

}
