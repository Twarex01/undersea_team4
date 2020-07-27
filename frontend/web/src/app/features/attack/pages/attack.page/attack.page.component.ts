import { Component, OnInit } from '@angular/core';
import { AttackUnit } from '../../models/attack-unit';
import { AttackService } from '../../services/attack.service';
import { AttackPlayer } from '../../models/attack-player';
import { forkJoin } from 'rxjs';
import { AttackBattle } from '../../models/attack-battle';
import { Battle } from '../../../battles/models/battle';
import { UnitWithName } from '../../../../shared/clients';
import { BattlesService } from '../../../battles/services/battles.service';
import { StatusNotificationService } from '../../../../core/services/status-notification.service';

@Component({
  selector: 'app-attack.page',
  templateUrl: './attack.page.component.html',
  styleUrls: ['./attack.page.component.css']
})
export class AttackPageComponent implements OnInit {

  selectedPlayerId: number = -1;
  units: AttackUnit[] = new Array<AttackUnit>();
  players: AttackPlayer[] = new Array<AttackPlayer>();

  constructor(private attackService: AttackService, private battleService: BattlesService, private notificationService: StatusNotificationService) { }

  ngOnInit(): void {
    this.getAllData();
    this.notificationService.notifications.subscribe(() => this.updateCountryUnits());
  }

  private getAllData() {
    forkJoin(
      this.attackService.getPlayerList(),
      this.attackService.getCountryName()
    ).subscribe(([playerList, countryName]) => {
      this.players = playerList.filter((player) => player.name !== countryName)
    })
    forkJoin(
      this.attackService.getCountryUnits(),
      this.attackService.getUnitDetails(),
      this.battleService.getCountryBattles()
    ).subscribe(([countryUnits, unitDetails, countryBattles]) => {
      const unitsToSubtract = this.getNumberOfUnitsWhoAreInBattle(countryBattles);
      unitDetails.forEach((unitDetail) => {
        if(unitDetail.name !== "Felfedező") {
          const numberOfUnitsToSubtract = unitsToSubtract.find((uts) => uts.name == unitDetail.name)?.count ?? 0;
          const countryUnitCount = countryUnits.find((cu) => cu.id == unitDetail.id)?.count ?? 0;
          this.units.push({
            id: unitDetail.id,
            imageSrc: unitDetail.imageSrc,
            name: unitDetail.name,
            count: countryUnitCount - numberOfUnitsToSubtract,
            countToAttack: 0
          })
        }
      });
    })
  }

  private updateCountryUnits() {
    this.attackService.getCountryUnits().subscribe((cus) => {
      cus.forEach((cu) => {
        const unit = this.units.find((u) => u.id == cu.id)!;
        if(unit){
          unit.count = cu.count;
          unit.countToAttack = 0;
        }
      })
    })
  }

  private getNumberOfUnitsWhoAreInBattle(countryBattles: Battle[]): UnitWithName[] {
    let results: UnitWithName[] =  [];
    countryBattles.forEach((cb) => {
      cb.units.forEach((unit) => {
        const resultUnitIdx = results.findIndex((resultUnit) => resultUnit.name === unit.name);
        if(resultUnitIdx !== -1)
          results[resultUnitIdx].count += unit.count;
        else
          results.push(unit);
      })
    })
    return results;
  }

  onAttack() {
    const battle: AttackBattle = {
      defenderId: this.selectedPlayerId,
      army: this.units.map((unit) => ({id: unit.id, count: unit.countToAttack}))
    }
    this.attackService.attack(battle).subscribe(() => {
      this.units.forEach(unit => {
        unit.count -= unit.countToAttack;
        unit.countToAttack = 0
      });
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
