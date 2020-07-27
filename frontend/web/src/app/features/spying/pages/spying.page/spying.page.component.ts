import { Component, OnInit } from '@angular/core';
import { AttackUnit } from '../../../attack/models/attack-unit';
import { AttackPlayer } from '../../../attack/models/attack-player';
import { SpyingService } from '../../services/spying.service';
import { forkJoin } from 'rxjs';
import { BattlesService } from '../../../battles/services/battles.service';
import { Battle } from '../../../battles/models/battle';
import { UnitWithName } from '../../../../shared/clients';
import { StatusNotificationService } from '../../../../core/services/status-notification.service';

@Component({
  selector: 'app-spying.page',
  templateUrl: './spying.page.component.html',
  styleUrls: ['./spying.page.component.css']
})
export class SpyingPageComponent implements OnInit {

  baseUrl: string = "https://undersea.azurewebsites.net/";

  selectedPlayerId: number = -1;
  explorerUnits: AttackUnit[] = [];
  players: AttackPlayer[] = [];

  constructor(private spyingService: SpyingService, private battleService: BattlesService, private notificationService: StatusNotificationService) { }

  ngOnInit(): void {
    this.getAllData();
    this.notificationService.notifications.subscribe(() => this.updateCountryUnits());
  }

  private getAllData() {
    forkJoin(
      this.spyingService.getPlayerList(),
      this.spyingService.getCountryName()
    ).subscribe(([playerList, countryName]) => {
      this.players = playerList.filter((player) => player.name !== countryName);
    })
    forkJoin(
      this.spyingService.getCountryUnits(),
      this.spyingService.getUnitDetails(),
      this.battleService.getCountrySpiesDetails()
    ).subscribe(([countryUnits, unitDetails, sentSpiesDetails]) => {
      const explorerDetails = unitDetails.find((ud) => ud.name === "Felfedező")!;
      const countryExplorers = countryUnits.find((cu) => cu.id === explorerDetails.id);
      const countryExplorersCount = countryExplorers?.count ?? 0;
      const unitsToSubtract = this.getNumberOfUnitsWhoAreInBattle(sentSpiesDetails).count;
      this.explorerUnits.push({
        id: explorerDetails.id,
          imageSrc: this.baseUrl + explorerDetails.imageSrc,
          name: explorerDetails.name,
          count: countryExplorersCount - unitsToSubtract,
          countToAttack: 0
      })
    })
  }

  private updateCountryUnits() {
    this.spyingService.getCountryUnits().subscribe((cus) => {
      if(this.explorerUnits[0]){
        const countryExplorers = cus.find((cu) => cu.id === this.explorerUnits[0].id) ?? {
          count: 0
        };
        this.explorerUnits[0].count = countryExplorers.count;
        this.explorerUnits[0].countToAttack = 0;
      }
    })
  }

  private getNumberOfUnitsWhoAreInBattle(sentSpiesDetails: Battle[]): UnitWithName {
    const result = new UnitWithName ({
      name: "Felfedező",
      count: 0
    });

    sentSpiesDetails.forEach((cb) => {
      const num = cb.units.find((unit) => unit.name === "Felfedező")?.count ?? 0;
      result.count += num;
    })
    return result;
  }

  onExplore() {
    this.spyingService.explore({targetCountryId: this.selectedPlayerId, numberOfExplorers: this.explorerUnits[0].countToAttack}).subscribe(() => {
      this.explorerUnits[0].count -= this.explorerUnits[0].countToAttack;
      this.explorerUnits[0].countToAttack = 0;
    });
  }

  onSelectedPlayerChanged(id: number) {
    this.selectedPlayerId = id;
  }

  isReadyToSend(): boolean {
    return this.selectedPlayerId !== -1 && this.explorerUnits[0].countToAttack > 0;
  }

}
