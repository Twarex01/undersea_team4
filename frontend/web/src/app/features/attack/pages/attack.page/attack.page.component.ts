import { Component, OnInit } from '@angular/core';
import { Unit } from '../../unit';
import { AttackService } from '../../services/attack.service';
import { Player } from '../../player';

@Component({
  selector: 'app-attack.page',
  templateUrl: './attack.page.component.html',
  styleUrls: ['./attack.page.component.css']
})
export class AttackPageComponent implements OnInit {

  selectedPlayerId: number = -1;

  units: Unit[] = new Array<Unit>(
    {id: 0, name: "Lézercápa", imageSrc: "../../../../assets/icons/shark.svg", count: 20, countToAttack: 0},
    {id: 1, name: "Rohamóka", imageSrc: "../../../../assets/icons/seal.svg", count: 50, countToAttack: 0},
    {id: 2, name: "Csatacsikó", imageSrc: "../../../../assets/icons/seahorse.svg", count: 70, countToAttack: 0}
  );

  players: Player[] = new Array<Player>(
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
  }

  onAttack() {
    //TODO
    this.attackService.attack();
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
