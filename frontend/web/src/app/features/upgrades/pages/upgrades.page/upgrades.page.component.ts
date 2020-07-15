import { Component, OnInit } from '@angular/core';
import { Upgrade } from '../../upgrade';
import { UpgradeService } from '../../services/upgrade.service';

@Component({
  selector: 'app-upgrades.page',
  templateUrl: './upgrades.page.component.html',
  styleUrls: ['./upgrades.page.component.css']
})
export class UpgradesPageComponent implements OnInit {

  upgradeSelected: number = -1;
  upgrades: Upgrade[] = new Array<Upgrade>(
    { id: 0, imageSrc: "../../../../../assets/upgrades/iszaptraktor.png", name: "Iszaptraktor", description: "növeli a krumpli termesztést 10%-kal", roundsLeft: 3, isDone: false, isSelected: false},
    { id: 1, imageSrc: "../../../../../assets/upgrades/iszaptraktor.png", name: "Iszaptraktor", description: "növeli a krumpli termesztést 10%-kal", roundsLeft: 15, isDone: false, isSelected: false},
    { id: 2, imageSrc: "../../../../../assets/upgrades/iszaptraktor.png", name: "Iszaptraktor", description: "növeli a krumpli termesztést 10%-kal", roundsLeft: 15, isDone: false, isSelected: false},
    { id: 3, imageSrc: "../../../../../assets/upgrades/iszaptraktor.png", name: "Iszaptraktor", description: "növeli a krumpli termesztést 10%-kal", roundsLeft: 15, isDone: false, isSelected: false},
    { id: 4, imageSrc: "../../../../../assets/upgrades/iszaptraktor.png", name: "Iszaptraktor", description: "növeli a krumpli termesztést 10%-kal", roundsLeft: 0, isDone: true, isSelected: false},
    { id: 5, imageSrc: "../../../../../assets/upgrades/iszaptraktor.png", name: "Iszaptraktor", description: "növeli a krumpli termesztést 10%-kal", roundsLeft: 0, isDone: true, isSelected: false}
  );

  constructor(private upgradeService: UpgradeService) { }

  ngOnInit(): void {
    //TODO
    //this.upgradeService.getCountryUpgrades().subscribe();
  }

  selectUpgrade(id: number) {
    if(this.upgradeSelected !== -1)
      this.upgrades[this.upgradeSelected].isSelected = false;
    this.upgradeSelected = id;
    this.upgrades[id].isSelected = true;
  }

  buySelectedUpgrade() {
    //TODO
    this.upgradeService.buyUpgrade(this.upgradeSelected);
    console.log("Upgrade megvásárolva: " + this.upgradeSelected);
  }

}
