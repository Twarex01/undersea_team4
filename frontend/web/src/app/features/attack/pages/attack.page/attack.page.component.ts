import { Component, OnInit } from '@angular/core';
import { AttackUnit } from '../../models/attack-unit';
import { AttackService } from '../../services/attack.service';
import { AttackPlayer } from '../../models/attack-player';
import { forkJoin } from 'rxjs';
import { AttackBattle } from '../../models/attack-battle';
import { CountryUnit } from '../../models/country-unit';

@Component({
  selector: 'app-attack.page',
  templateUrl: './attack.page.component.html',
  styleUrls: ['./attack.page.component.css']
})
export class AttackPageComponent implements OnInit {

  countryName: string = "";

  selectedPlayerId: number = -1;

  units: AttackUnit[] = new Array<AttackUnit>(
    {id: 0, name: "Lézercápa", imageSrc: "../../../../assets/icons/shark.svg", count: 20, countToAttack: 0},
    {id: 1, name: "Rohamóka", imageSrc: "../../../../assets/icons/seal.svg", count: 50, countToAttack: 0},
    {id: 2, name: "Csatacsikó", imageSrc: "../../../../assets/icons/seahorse.svg", count: 70, countToAttack: 0}
  );

  players: AttackPlayer[] = new Array<AttackPlayer>(
    {id: 0, name: "józsiiwinner12", isSelected: false },
    {id: 1, name: "kiscsiko1990", isSelected: false },
    {id: 2, name: "józsiiwinner12", isSelected: false },
    {id: 3, name: "kiscsiko1990", isSelected: false },
    {id: 4, name: "józsiiwinner12", isSelected: false },
    {id: 5, name: "kiscsiko1990", isSelected: false },
    {id: 6, name: "józsiiwinner12", isSelected: false },
    {id: 7, name: "kiscsiko1990", isSelected: false },
    {id: 9, name: "józsiiwinner12", isSelected: false },
    {id: 10, name: "kiscsiko1990", isSelected: false }
  );

  constructor(private attackService: AttackService) { }

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
      this.units = [];
      unitDetails.forEach((unitDetail) => {
        const countryUnit = countryUnits.find((cu) => cu.id == unitDetail.id)!;
        this.units.push({
          id: unitDetail.id,
          imageSrc: unitDetail.imageSrc,
          name: unitDetail.name,
          count: countryUnit?.count ?? 0,
          countToAttack: 0
        })
      })
    })
  }

  onAttack() {
    const battle: AttackBattle = {
      defenderId: this.selectedPlayerId,
      army: this.units.map((unit) => ({id: unit.id, count: unit.countToAttack}))
    }
    console.log(battle);
    this.attackService.attack(battle).subscribe(() => {
      console.log("OK");
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
