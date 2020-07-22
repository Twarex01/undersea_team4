import { Component, OnInit } from '@angular/core';
import { AttackUnit } from '../../../attack/models/attack-unit';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-spying.page',
  templateUrl: './spying.page.component.html',
  styleUrls: ['./spying.page.component.css']
})
export class SpyingPageComponent implements OnInit {

  countryName: string = "";
  selectedPlayerId: number = -1;
  explorerUnits: AttackUnit;

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onExplore() {
    //TODO
  }

  onSelectedPlayerChanged(id: number) {
    this.selectedPlayerId = id;
  }

  isReadyToSend(): boolean {
    return this.selectedPlayerId !== -1 && this.explorerUnits.countToAttack > 0;
  }

}
