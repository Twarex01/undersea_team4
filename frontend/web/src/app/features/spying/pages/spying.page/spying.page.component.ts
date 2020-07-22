import { Component, OnInit } from '@angular/core';
import { AttackUnit } from '../../../attack/models/attack-unit';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AttackPlayer } from '../../../attack/models/attack-player';
import { SpyingService } from '../../services/spying.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-spying.page',
  templateUrl: './spying.page.component.html',
  styleUrls: ['./spying.page.component.css']
})
export class SpyingPageComponent implements OnInit {

  selectedPlayerId: number = -1;
  explorerUnits: AttackUnit[] = [];
  players: AttackPlayer[] = [];

  constructor(private spyingService: SpyingService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    forkJoin(
      this.spyingService.getPlayerList(),
      this.spyingService.getCountryName()
    ).subscribe(([playerList, countryName]) => {
      this.players = playerList.filter((player) => player.name !== countryName);
    })
    forkJoin(
      this.spyingService.getCountryUnits(),
      this.spyingService.getUnitDetails()
    ).subscribe(([countryUnits, unitDetails]) => {
      const explorerDetails = unitDetails.find((ud) => ud.name === "Felfedező")!;
      const countryExplorers = countryUnits.find((cu) => cu.id === explorerDetails.id);
      this.explorerUnits.push({
        id: explorerDetails.id,
          imageSrc: explorerDetails.imageSrc,
          name: explorerDetails.name,
          count: countryExplorers?.count ?? 0,
          countToAttack: 0
      })
    })
  }

  onExplore() {
    this.spyingService.explore({targetCountryId: this.selectedPlayerId, numberOfExplorers: this.explorerUnits[0].countToAttack}).subscribe(() => {
      this.snackBar.open("Sikeresen elindítottad a felfedezést!", '', {panelClass: "custom-snackbar"});
      this.explorerUnits[0].countToAttack = 0;
    },
    (error) => this.snackBar.open(error.response));
  }

  onSelectedPlayerChanged(id: number) {
    this.selectedPlayerId = id;
  }

  isReadyToSend(): boolean {
    return this.selectedPlayerId !== -1 && this.explorerUnits[0].countToAttack > 0;
  }

}
