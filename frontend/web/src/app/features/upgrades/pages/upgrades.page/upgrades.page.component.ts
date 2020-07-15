import { Component, OnInit } from '@angular/core';
import { Upgrade } from '../../upgrade';
import { UpgradeService } from '../../services/upgrade.service';

@Component({
  selector: 'app-upgrades.page',
  templateUrl: './upgrades.page.component.html',
  styleUrls: ['./upgrades.page.component.css']
})
export class UpgradesPageComponent implements OnInit {

  upgradeIndex: number = -1;
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

  selectUpgrade(index: number) {
    if(this.upgradeIndex !== -1)
      this.upgrades[this.upgradeIndex].isSelected = false;
    this.upgradeIndex = index;
    this.upgrades[index].isSelected = true;
  }

  buySelectedUpgrade() {
    //TODO
    this.upgradeService.buyUpgrade(this.upgrades[this.upgradeIndex].id);
    console.log("Upgrade megvásárolva: " + this.upgradeIndex);
  }

}
