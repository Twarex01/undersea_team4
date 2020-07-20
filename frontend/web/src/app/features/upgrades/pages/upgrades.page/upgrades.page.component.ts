import { Component, OnInit } from '@angular/core';
import { Upgrade } from '../../models/upgrade';
import { UpgradeService } from '../../services/upgrade.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-upgrades.page',
  templateUrl: './upgrades.page.component.html',
  styleUrls: ['./upgrades.page.component.css'],
})
export class UpgradesPageComponent implements OnInit {
  selectedUpgradeIndex: number = -1;
  upgrades: Upgrade[] = new Array<Upgrade>(
    {
      id: 0,
      imageSrc: '../../../../../assets/upgrades/iszaptraktor.png',
      name: 'Iszaptraktor',
      description: 'növeli a krumpli termesztést 10%-kal',
      roundsLeft: 3,
      isDone: false,
      isSelected: false,
    },
    {
      id: 1,
      imageSrc: '../../../../../assets/upgrades/iszaptraktor.png',
      name: 'Iszaptraktor',
      description: 'növeli a krumpli termesztést 10%-kal',
      roundsLeft: 15,
      isDone: false,
      isSelected: false,
    },
    {
      id: 2,
      imageSrc: '../../../../../assets/upgrades/iszaptraktor.png',
      name: 'Iszaptraktor',
      description: 'növeli a krumpli termesztést 10%-kal',
      roundsLeft: 15,
      isDone: false,
      isSelected: false,
    },
    {
      id: 3,
      imageSrc: '../../../../../assets/upgrades/iszaptraktor.png',
      name: 'Iszaptraktor',
      description: 'növeli a krumpli termesztést 10%-kal',
      roundsLeft: 15,
      isDone: false,
      isSelected: false,
    },
    {
      id: 4,
      imageSrc: '../../../../../assets/upgrades/iszaptraktor.png',
      name: 'Iszaptraktor',
      description: 'növeli a krumpli termesztést 10%-kal',
      roundsLeft: 0,
      isDone: true,
      isSelected: false,
    },
    {
      id: 5,
      imageSrc: '../../../../../assets/upgrades/iszaptraktor.png',
      name: 'Iszaptraktor',
      description: 'növeli a krumpli termesztést 10%-kal',
      roundsLeft: 0,
      isDone: true,
      isSelected: false,
    }
  );

  constructor(private upgradeService: UpgradeService) {}

  ngOnInit(): void {
    forkJoin(
      this.upgradeService.getCountryUpgrades(),
      this.upgradeService.getUpgradeDetails()
    ).subscribe(([countryUpgrades, upgradeDetails]) => {
      this.upgrades = [];
      upgradeDetails.forEach((upgradeDetail) => {
        const countryUpgrade = countryUpgrades.find(
          (cd) => cd.id == upgradeDetail.id
        )!;
        this.upgrades.push({
          id: upgradeDetail.id,
          imageSrc: upgradeDetail.imageSrc,
          name: upgradeDetail.name,
          roundsLeft: countryUpgrade?.roundsLeft,
          description: upgradeDetail.description,
          isDone: countryUpgrade?.roundsLeft === 0 ? true : false,
          isSelected: false,
        });
      });
    });
  }

  selectUpgrade(index: number) {
    if (this.selectedUpgradeIndex !== -1)
      this.upgrades[this.selectedUpgradeIndex].isSelected = false;
    this.selectedUpgradeIndex = index;
    this.upgrades[index].isSelected = true;
  }

  buySelectedUpgrade() {
    this.upgradeService.buyUpgrade(this.upgrades[this.selectedUpgradeIndex].id).subscribe(() => {
      this.upgrades[this.selectedUpgradeIndex].roundsLeft = 15;
      this.selectedUpgradeIndex = -1;
    });
  }

  isSelectedEnabledToBuy(): boolean {
    if(this.selectedUpgradeIndex === -1)  return false;
    for(let i = 0; i < this.upgrades.length; i++){
      if(!!this.upgrades[i].roundsLeft)
        return false;
    }
    const selectedUpgrade = this.upgrades[this.selectedUpgradeIndex];
    return !selectedUpgrade.isDone;
  }
}
