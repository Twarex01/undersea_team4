import { Component, OnInit } from '@angular/core';
import { AttackUnit } from '../../models/attack-unit';
import { AttackService } from '../../services/attack.service';
import { AttackPlayer } from '../../models/attack-player';
import { forkJoin } from 'rxjs';
import { AttackBattle } from '../../models/attack-battle';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-attack.page',
  templateUrl: './attack.page.component.html',
  styleUrls: ['./attack.page.component.css']
})
export class AttackPageComponent implements OnInit {


  selectedPlayerId: number = -1;

  units: AttackUnit[] = new Array<AttackUnit>();

  players: AttackPlayer[] = new Array<AttackPlayer>();

  constructor(private attackService: AttackService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    forkJoin(
      this.attackService.getPlayerList(),
      this.attackService.getCountryName()
    ).subscribe(([playerList, countryName]) => {
      this.players = playerList.filter((player) => player.name !== countryName)
    })
    forkJoin(
      this.attackService.getCountryUnits(),
      this.attackService.getUnitDetails(),
    ).subscribe(([countryUnits, unitDetails]) => {
      unitDetails.forEach((unitDetail) => {
        if(unitDetail.name !== "Felfedező"){
          const countryUnit = countryUnits.find((cu) => cu.id == unitDetail.id)!;
          this.units.push({
            id: unitDetail.id,
            imageSrc: unitDetail.imageSrc,
            name: unitDetail.name,
            count: countryUnit?.count ?? 0,
            countToAttack: 0
          })
        }
      })
    })
  }

  onAttack() {
    const battle: AttackBattle = {
      defenderId: this.selectedPlayerId,
      army: this.units.map((unit) => ({id: unit.id, count: unit.countToAttack}))
    }
    this.attackService.attack(battle).subscribe(() => {
      this.snackBar.open("Sikeresen elindítottad a támadást!", '', {panelClass: "custom-snackbar"})
      this.units.forEach(unit => unit.countToAttack = 0);
    })
  }

  onSelectedPlayerChanged(id: number) {
    this.selectedPlayerId = id;
  }

  isReadyToBuy(): boolean {
    return this.selectedPlayerId !== -1 && this.areUnitsSelected();
  }

  areUnitsSelected(): boolean {
    for(let i = 0; i < this.units.length; i++){
      if(this.units[i].countToAttack > 0)
        return true;
    }
    return false;
  }

}
